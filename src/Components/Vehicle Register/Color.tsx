import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import VehicleRegisterService from "../../../services/vehicleRegister";
import InfiniteScroll from "react-infinite-scroll-component";
import { MdDelete, MdEdit, MdSave } from "react-icons/md";
import { toast } from "react-toastify";

export default function Color() {
    // const navigate = useNavigate();
    const [state, setState] = useState({
        deleteConfirm: false,
        isEditing: false,
        id: "",
        editColor: { name: "", hex: "" }

    })

    interface Colors {
        _id: string;
        name: string;
        hex: string;
    }

    const [colors, setColors] = useState<Colors[]>([]);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const limit = 10;

    useEffect(() => {
        const fetchColors = async () => {
            try {
                const response: Colors[] = await VehicleRegisterService.colors(page, limit);
                if (response.length > 0) {
                    setColors((prevColors) => {
                        const uniqueColors = response.filter(
                            (newColor) => !prevColors.some((color) => color._id === newColor._id)
                        );
                        return [...prevColors, ...uniqueColors];
                    });
                    setHasMore(response.length === limit);
                } else {
                    setHasMore(false);
                }
            } catch (error) {
                console.error("Error fetching colors:", error);
                setHasMore(false);
            }
        };
        fetchColors();
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
    // Color delete section
    const deleteHandle = async () => {
        if (state.id) {
            try {
                const response = await VehicleRegisterService.deleteColor(state.id);
                setState((prev) => ({ ...prev, deleteConfirm: false }));
                console.log("Driver profile deleted successfully:", response);
                toast.success("Driver profile deleted successfully");
                setColors((prevColors) => prevColors.filter((color) => color._id !== state.id))
            } catch (error) {
                console.error("Error deleting driver profile:", error);
                toast.error("Error deleting driver profile. Please try again.");
            }
        } else {
            console.warn("Slug is undefined, cannot delete driver profile.");
        }
    }

    // Handel Edit
    const handleEdit = (slug: string, color: Colors) => {
        setState((prev) => ({
            ...prev,
            id: slug,
            isEditing: !prev.isEditing,
            editColor: { name: color.name, hex: color.hex }

        }))
    }

    // Edit Color Save
    const handleEditSave = async (slug: string) => {
        if (state.isEditing) {
            try {
                const updatedColor = { name: state.editColor.name, hex: state.editColor.hex };
                const response = await VehicleRegisterService.edit(slug, updatedColor);
                setColors((prevColors) =>
                    prevColors.map((color) =>
                        color._id === slug ? { ...color, ...updatedColor } : color
                    )
                );
                toast.success("Color updated successfully");
                console.log(response);
            } catch (error) {
                console.error("Error updating color:", error);
                toast.error("Error updating color. Please try again.");
            }
        }
        setState((prev) => ({ ...prev, isEditing: false, editColor: { name: "", hex: "" } }));
    };

    return (
        <>
            <div className="bg-gray-100 h-full px-10 pb-6">
                <div>
                    <p className="font-bold text-2xl py-4">Colors</p>
                </div>
                <div>
                    <p className="font-semibold py-4">Total Colors : {colors.length}</p>
                </div>
                <div className="w-[80%] max-w-4xl">
                    <div className="overflow-y-auto max-h-[350px]">
                        <InfiniteScroll
                            dataLength={colors.length}
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
                                        <th className="py-4 px-6 text-left text-white text-sm font-semibold uppercase">Color Code</th>
                                        <th className="py-4 px-6 text-left text-white text-sm font-semibold uppercase">Color Name</th>
                                        <th className="py-4 px-6 text-left text-white text-sm font-semibold uppercase">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {colors.map((color) => (
                                        <tr
                                            key={color._id}
                                            className="hover:bg-gray-50 transition duration-150 ease-in-out cursor-pointer"
                                        >
                                            <td
                                                // onClick={() => {
                                                //     if (!state.isEditing) {
                                                //         navigate(`view/${color._id}`);
                                                //     }
                                                // }}
                                                className="py-4 px-6 text-gray-700 font-medium">
                                                <div>
                                                    <input type="text"
                                                        value={state.isEditing && state.id === color._id ? state.editColor.name : color.name.toUpperCase()}
                                                        onChange={(e) =>
                                                            setState((prev) => ({ ...prev, editColor: { ...prev.editColor, name: e.target.value } }))
                                                        }
                                                        disabled={!state.isEditing || state.id !== color._id}
                                                    />
                                                </div>
                                            </td>
                                            <td
                                                className="py-4 px-6 flex items-center gap-3">
                                                <div
                                                    className="w-5 h-5 rounded-full shadow-sm border border-gray-200"
                                                    style={{ backgroundColor: `#${color.hex}` }}
                                                ></div>
                                                <div className="text-gray-600">#
                                                    <input type="text"
                                                        value={state.isEditing && state.id === color._id ? state.editColor.hex : color.hex.toUpperCase()}
                                                        onChange={(e) => setState((prev) => ({
                                                            ...prev,
                                                            editColor: { ...prev.editColor, hex: e.target.value }
                                                        }))}
                                                        disabled={!state.isEditing || state.id !== color._id}
                                                    />
                                                </div>
                                            </td>
                                            <td><div className="flex gap-4 text-2xl">
                                                {state.isEditing && state.id === color._id ?
                                                    (<MdSave
                                                        onClick={() => (handleEditSave(color._id))}
                                                        className="text-blue-600" />
                                                    ) :
                                                    (<MdEdit
                                                        onClick={() => (handleEdit(color._id, color))}
                                                        className="text-blue-600" />)
                                                }

                                                <MdDelete
                                                    onClick={() => (handelDeleteConfirm(color._id))}
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
    );
}