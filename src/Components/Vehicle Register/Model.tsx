import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import VehicleRegisterService from "../../../services/vehicleRegister";
import InfiniteScroll from "react-infinite-scroll-component";
import { MdDelete, MdEdit, MdSave } from "react-icons/md";
import { toast } from "react-toastify";

export default function Model() {

    // const navigate = useNavigate();
    const [state, setState] = useState({
        deleteConfirm: false,
        isEditing: false,
        id: "",
        editmodel: { name: "", vehicleType: "",brandId:"" }

    })

    interface models {
        _id: string;
        name: string;
        vehicleType: string;
        brandId:string
    }

    const [models, setmodels] = useState<models[]>([]);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const limit = 10;

    useEffect(() => {
        const fetchmodels = async () => {
            try {
                const response: models[] = await VehicleRegisterService.model(page, limit);
                if (response.length > 0) {
                    setmodels((prevmodels) => {
                        const uniquemodels = response.filter(
                            (newmodel) => !prevmodels.some((model) => model._id === newmodel._id)
                        );
                        return [...prevmodels, ...uniquemodels];
                    });
                    setHasMore(response.length === limit);
                } else {
                    setHasMore(false);
                }
            } catch (error) {
                console.error("Error fetching models:", error);
                setHasMore(false);
            }
        };
        fetchmodels();
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
    // model delete section
    const deleteHandle = async () => {
        if (state.id) {
            try {
                const response = await VehicleRegisterService.deleteModel(state.id);
                setState((prev) => ({ ...prev, deleteConfirm: false }));
                console.log("Driver profile deleted successfully:", response);
                toast.success("Driver profile deleted successfully");
                setmodels((prevmodels) => prevmodels.filter((model) => model._id !== state.id))
            } catch (error) {
                console.error("Error deleting driver profile:", error);
                toast.error("Error deleting driver profile. Please try again.");
            }
        } else {
            console.warn("Slug is undefined, cannot delete driver profile.");
        }
    }

    // Handel Edit
    const handleEdit = (slug: string, model: models) => {
        setState((prev) => ({
            ...prev,
            id: slug,
            isEditing: !prev.isEditing,
            editmodel: { name: model.name, vehicleType: model.vehicleType, brandId:model.brandId }

        }))
    }

    // Edit model Save
    const handleEditSave = async (slug: string) => {
        if (state.isEditing) {
            try {
                const updatedmodel = 
                { name: state.editmodel.name, 
                    vehicleType: state.editmodel.vehicleType, 
                    brandId:state.editmodel.brandId };
                const response = await VehicleRegisterService.editModel(slug, updatedmodel);
                setmodels((prevmodels) =>
                    prevmodels.map((model) =>
                        model._id === slug ? { ...model, ...updatedmodel } : model
                    )
                );
                toast.success("model updated successfully");
                console.log(response);
            } catch (error) {
                console.error("Error updating model:", error);
                toast.error("Error updating model. Please try again.");
            }
        }
        setState((prev) => ({ ...prev, isEditing: false, editmodel: { name: "", vehicleType: "" ,brandId:""} }));
    };

    return (
        <>
            <div className="bg-gray-100 h-full px-10 pb-6">
                <div>
                    <p className="font-bold text-2xl py-4">Models</p>
                </div>
                <div>
                    <p className="font-semibold py-4">Total Models : {models.length}</p>
                </div>
                <div className="w-[80%] max-w-4xl">
                    <div className="overflow-y-auto max-h-[350px]">
                        <InfiniteScroll
                            dataLength={models.length}
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
                                        <th className="py-4 px-6 text-left text-white text-sm font-semibold uppercase">Models Name</th>
                                        <th className="py-4 px-6 text-left text-white text-sm font-semibold uppercase">Vehicle Type</th>
                                        <th className="py-4 px-6 text-left text-white text-sm font-semibold uppercase">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {models.map((model) => (
                                        <tr
                                            key={model._id}
                                            className="hover:bg-gray-50 transition duration-150 ease-in-out cursor-pointer"
                                        >
                                            <td
                                                // onClick={() => {
                                                //     if (!state.isEditing) {
                                                //         navigate(`view/${model._id}`);
                                                //     }
                                                // }}
                                                className="py-4 px-6 text-gray-700 font-medium">
                                                <div>
                                                    <input type="text"
                                                        value={state.isEditing && state.id === model._id ? state.editmodel.name : model.name.toUpperCase()}
                                                        onChange={(e) =>
                                                            setState((prev) => ({ ...prev, editmodel: { ...prev.editmodel, name: e.target.value } }))
                                                        }
                                                        disabled={!state.isEditing || state.id !== model._id}
                                                    />
                                                </div>
                                            </td>
                                            <td
                                                className="py-4 px-6 flex items-center gap-3">
                                                <div className="text-gray-600">
                                                    <input type="text"
                                                     style={{ textTransform: "uppercase" }}
                                                        value={
                                                            state.isEditing && state.id === model._id
                                                                ? state.editmodel.vehicleType
                                                                : model.vehicleType === "B"
                                                                    ? "Bike"
                                                                    : model.vehicleType === "S"
                                                                        ? "Scooty"
                                                                        : model.vehicleType === "C"
                                                                            ? "Car"
                                                                            : model.vehicleType.toUpperCase()
                                                        }
                                                        onChange={(e) => setState((prev) => ({
                                                            ...prev,
                                                            editmodel: { ...prev.editmodel, vehicleType: e.target.value }
                                                        }))}
                                                        disabled={!state.isEditing || state.id !== model._id}
                                                    />
                                                </div>
                                            </td>
                                            <td><div className="flex gap-4 text-2xl">
                                                {state.isEditing && state.id === model._id ?
                                                    (<MdSave
                                                        onClick={() => (handleEditSave(model._id))}
                                                        className="text-blue-600" />
                                                    ) :
                                                    (<MdEdit
                                                        onClick={() => (handleEdit(model._id, model))}
                                                        className="text-blue-600" />)
                                                }

                                                <MdDelete
                                                    onClick={() => (handelDeleteConfirm(model._id))}
                                                    className="text-red-500" /></div></td>
                                        </tr>
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
