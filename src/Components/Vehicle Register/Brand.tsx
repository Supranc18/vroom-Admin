import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import VehicleRegisterService from "../../../services/vehicleRegister";
import InfiniteScroll from "react-infinite-scroll-component";
import { MdDelete, MdEdit, MdSave } from "react-icons/md";
import { toast } from "react-toastify";




export default function Brand() {
    // const navigate = useNavigate();
    const [state, setState] = useState({
        deleteConfirm: false,
        isEditing: false,
        id: "",
        editbrand: { name: "", logo: "" },
        model: null as string | null

    })

    interface brands {
        _id: string;
        name: string;
        logo: string;
        models:[{
            _id: string;
            name:string;
            vehicleType:string
        }]
    }

    const [brands, setbrands] = useState<brands[]>([]);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const limit = 10;

    useEffect(() => {
        const fetchbrands = async () => {
            try {
                const response: brands[] = await VehicleRegisterService.brand(page, limit);
                if (response.length > 0) {
                    setbrands((prevbrands) => {
                        const uniquebrands = response.filter(
                            (newbrand) => !prevbrands.some((brand) => brand._id === newbrand._id)
                        );
                        return [...prevbrands, ...uniquebrands];
                    });
                    setHasMore(response.length === limit);
                } else {
                    setHasMore(false);
                }
            } catch (error) {
                console.error("Error fetching brands:", error);
                setHasMore(false);
            }
        };
        fetchbrands();
    }, [page]);

    const fetchMoreData = () => {
        if (hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    // deleteconfirmmation popout
    const handelDeleteConfirm = (slug: string) => {
        setState((perv) => ({ ...perv, deleteConfirm: !perv.deleteConfirm }))
        setState((perv) => ({ ...perv, id: slug }))
    }
    // brand delete section
    const deleteHandle = async () => {
        if (state.id) {
            try {
                const response = await VehicleRegisterService.deleteBrands(state.id);
                setState((prev) => ({ ...prev, deleteConfirm: false }));
                console.log("Driver profile deleted successfully:", response);
                toast.success("Driver profile deleted successfully");
                setbrands((prevbrands) => prevbrands.filter((brand) => brand._id !== state.id))
            } catch (error) {
                console.error("Error deleting driver profile:", error);
                toast.error("Error deleting driver profile. Please try again.");
            }
        } else {
            console.warn("Slug is undefined, cannot delete driver profile.");
        }
    }

    // Handel Edit
    const handleEdit = (slug: string, brand: brands) => {
        setState((prev) => ({
            ...prev,
            id: slug,
            isEditing: !prev.isEditing,
            editbrand: { name: brand.name, logo: brand.logo }

        }))
    }

    // Edit brand Save
    const handleEditSave = async (slug: string) => {
        if (state.isEditing) {
            try {
                const updatedbrand = { name: state.editbrand.name, logo: state.editbrand.logo };
                const response = await VehicleRegisterService.editBrand(slug, updatedbrand);
                setbrands((prevbrands) =>
                    prevbrands.map((brand) =>
                        brand._id === slug ? { ...brand, ...updatedbrand } : brand
                    )
                );
                toast.success("brand updated successfully");
                console.log(response);
            } catch (error) {
                console.error("Error updating brand:", error);
                toast.error("Error updating brand. Please try again.");
            }
        }
        setState((prev) => ({ ...prev, isEditing: false, editbrand: { name: "", logo: "" } }));
    };

    return (
        <>
            <div className="bg-gray-100 h-full px-10 pb-6">
                <div>
                    <p className="font-bold text-2xl py-4">Brands</p>
                </div>
                <div>
                    <p className="font-semibold py-4">Total Brands : {brands.length}</p>
                </div>
                <div className="w-[80%] max-w-4xl">
                    <div className="overflow-y-auto max-h-[350px]">
                        <InfiniteScroll
                            dataLength={brands.length}
                            next={fetchMoreData}
                            hasMore={hasMore}
                            loader={
                                <div className="flex justify-center items-center py-4">
                                    <div className="flex flex-col items-center">
                                        <div className="loader w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                        <h4 className="mt-4 text-center text-gray-600 font-medium">Loading...</h4>
                                    </div>
                                </div>
                            }
                            endMessage={
                                <p className="text-center py-4 font-semibold">
                                    <b>No more data to show</b>
                                </p>
                            }
                        >
                            <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
                                <thead className="bg-gradient-to-r from-purple-600 to-blue-500">
                                    <tr>
                                        <th className="py-4 px-6 text-left text-white text-sm font-semibold uppercase">Brand Logo</th>
                                        <th className="py-4 px-6 text-left text-white text-sm font-semibold uppercase">Brand Name</th>
                                        <th className="py-4 px-6 text-left text-white text-sm font-semibold uppercase">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {brands.map((brand) => (
                                        <>
                                            <tr
                                                key={brand._id}
                                                className="hover:bg-gray-50 transition duration-150 ease-in-out cursor-pointer"
                                            >
                                                <td
                                                onClick={() => {
                                                    setState((prev) => ({
                                                        ...prev,
                                                        model: prev.model  === brand._id ? null : brand._id
                                                    }));
                                                }}
                                                    className="py-4 px-6 text-gray-700 font-medium">
                                                    <div>
                                                        <img
                                                            src={state.isEditing && state.id === brand._id ? state.editbrand.logo : brand.logo}
                                                            alt={brand.name}
                                                        />
                                                    </div>
                                                </td>
                                                <td
                                                    className="py-4 px-6 flex items-center gap-3">
                                                    <div className="text-gray-600">
                                                        <input type="text"
                                                            value={state.isEditing && state.id === brand._id ? state.editbrand.name : brand.name.toUpperCase()}
                                                            onChange={(e) => setState((prev) => ({
                                                                ...prev,
                                                                editbrand: { ...prev.editbrand, logo: e.target.value }
                                                            }))}
                                                            disabled={!state.isEditing || state.id !== brand._id}
                                                        />
                                                    </div>
                                                </td>
                                                <td><div className="flex gap-4 text-2xl">
                                                    {state.isEditing && state.id === brand._id ?
                                                        (<MdSave
                                                            onClick={() => (handleEditSave(brand._id))}
                                                            className="text-blue-600" />
                                                        ) :
                                                        (<MdEdit
                                                            onClick={() => (handleEdit(brand._id, brand))}
                                                            className="text-blue-600" />)
                                                    }

                                                    <MdDelete
                                                        onClick={() => (handelDeleteConfirm(brand._id))}
                                                        className="text-red-500" /></div></td>
                                            </tr>
                                            {state.model === brand._id &&
                                                <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
                                                    <thead>
                                                        <tr>
                                                            <th className="py-2 px-6 text-left  text-sm font-semibold uppercase">Model Name</th>
                                                            <th className="py-2 px-6 text-lef text-sm font-semibold uppercase">Vehicle Type</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {brand.models.map((model)=>(
                                                            <tr 
                                                            className="hover:bg-gray-50 transition duration-150 ease-in-out cursor-pointer"
                                                            key={model._id}>
                                                            <td
                                                            className="py-4 px-6 text-gray-700 font-medium"
                                                            >{model.name}</td>
                                                            <td
                                                            className="py-4 px-6 text-gray-700 font-medium"
                                                            >{model.vehicleType}</td>
                                                            </tr>
                                                        ))}

                                                    </tbody>
                                                </table>
                                            }
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </InfiniteScroll>
                    </div>
                </div>
            </div >


            {/* Delete Confirmation Popout */}
            {
                state.deleteConfirm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col gap-6">
                            <p className='text-lg text-gray-800 font-semibold'>
                                Are you sure you want to delete this driver profile?
                            </p>
                            <div className='flex justify-between'>
                                <button
                                    className='bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all'
                                    onClick={deleteHandle}
                                >
                                    Yes
                                </button>
                                <button
                                    className='bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-all'
                                    onClick={() => setState((perv) => ({ ...perv, deleteConfirm: false }))}
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}
