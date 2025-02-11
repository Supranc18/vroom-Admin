import {useEffect, useState } from "react";
import { IoIosAdd, IoMdClose } from "react-icons/io";
import VehicleRegisterService from "../../../services/vehicleRegister";
import { z } from "zod";
import { toast } from "react-toastify";
import { Link} from "react-router-dom";


export default function VehicleRegister() {
    // zod
    const brandSchema = z.object({
        name: z.string().nonempty({ message: "Brand name is required" }),
        logo: z
            .string().nonempty({message:"Please select an image first"})
            .nullable()
    });

    const modelSchema = z.object({
        name: z.string().nonempty({ message: "Model name is required" }),
        vehicleType: z.string().nonempty({ message: "Vehicle Type is required" }),
        brandId: z.string().nonempty({ message: "Brand is required" }),
    });


    const colorSchema = z.object({
        name: z.string().nonempty({ message: "Color name is required" }),
        hex: z.string().nonempty({ message: "hex color code is required" }),
    });

    // State
    const [state, setState] = useState({
        dropdown: false,
        brand: false,
        color: false,
        model:false
    });

    // brand state handel
    const [brand, setBrand] = useState<{
        name: string;
        logo: File | string;
        errors: { name?: string; logo?: string };
    }>({
        name: "",
        logo: "",
        errors: {},
    });

    // Model state handel
    const [model, setModel] = useState<{
        name: string;
        vehicleType:string;
        brandId:string
        errors: { name?: string; vehicleType?: string; brandId?:string };
    }>({
        name: "",
        vehicleType:"",
        brandId:"",
        errors:{}
    })

    // color state Handel
    const [color, setColor] = useState<{
        name: string;
        hex: string;
        errors: { name?: string; hex?: string };
    }>({
        name: "",
        hex: "",
        errors: {},
    });

    // Fetching post Brand
    const handelBrandAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        setBrand((prev) => ({ ...prev, errors: {} })); // Reset errors

        // Validate the brand data
        const response = brandSchema.safeParse({ name: brand.name, logo: brand.logo });

        if (!response.success) {
            const errors = response.error.errors.reduce(
                (acc, err) => ({ ...acc, [err.path[0]]: err.message }),
                {}
            );
            setBrand((prev) => ({ ...prev, errors }));
            return;
        }
        
        if (brand.name && brand.logo) {
            try {
                if (brand.logo && typeof brand.logo !== 'string') {
                const response = await VehicleRegisterService.addbrand(brand.name, brand.logo );
                if (response?.success) {
                    toast.success("Brand Added Successfully");
                    setBrand({ name: "", logo: "", errors: {} });
                } else {
                    toast.error("Brand Adding Failed");
                }
            }
                else {
                    toast.error("Please upload a valid file.");
                  }
            } catch (error) {
                if (error instanceof Error) {
                    setBrand((prev) => ({ ...prev, error: "An error occurred. Please try again." }));
                    toast.error(error.message);  // Safely access error.message
                    console.error("Error adding brand:", error);
                }
            }
        }
    };
   

    // fetch post model
    const handelModelAdd=async(e:React.FormEvent)=>{
        e.preventDefault();
        setModel((prev) => ({ ...prev, errors: {} })); // Reset errors
        const response = modelSchema.safeParse(
            { name: model.name, vehicleType: model.vehicleType,brandId:model.brandId });

        if (!response.success) {
            const errors = response.error.errors.reduce(
                (acc, err) => ({ ...acc, [err.path[0]]: err.message }),
                {}
            );
            setModel((prev) => ({ ...prev, errors }));
            return;
        }
        try {
            const response = await VehicleRegisterService.addmodel(model.name, model.vehicleType,model.brandId);
            if (response?.success) {
                toast.success("Model Added Successfully");
                setModel({ name: "", vehicleType: "",brandId:"",  errors: {} });
            } else {
                toast.error("Model Adding Failed");
            }
        } catch (error) {
            if (error instanceof Error) {
                setModel((prev) => ({ ...prev, error: "An error occurred. Please try again." }));
                toast.error(error.message);  // Safely access error.message
                console.error("Error adding color:", error);
            }
        }
    }
    // get brand Id
    interface Brands {
        _id: string;
        name: string;
    }
    const [getBrand, setGetBrand]=useState<Brands[]>([])
    const page =1;
    const limit = 50;
    const fetchBrands = async () => {
        try {
            const response = await VehicleRegisterService.brand(page,limit);
            setGetBrand(response);
        } catch (error) {
            console.error("Error fetching drivers:", error);
        }
    };

    useEffect(() => {
        fetchBrands();
    },[page]);

    

    // Fetching post Color
    const handelColorAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        setColor((prev) => ({ ...prev, errors: {} })); // Reset errors
        const response = colorSchema.safeParse({ name: color.name, hex: color.hex });

        if (!response.success) {
            const errors = response.error.errors.reduce(
                (acc, err) => ({ ...acc, [err.path[0]]: err.message }),
                {}
            );
            setColor((prev) => ({ ...prev, errors }));
            return;
        }
        try {
            const response = await VehicleRegisterService.addcolor(color.name, color.hex);
            if (response?.success) {
                toast.success("Color Added Successfully");
                setColor({ name: "", hex: "", errors: {} });
            } else {
                toast.error("Color Adding Failed");
            }
        } catch (error) {
            if (error instanceof Error) {
                setColor((prev) => ({ ...prev, error: "An error occurred. Please try again." }));
                toast.error(error.message);  // Safely access error.message
                console.error("Error adding color:", error);
            }
        }
    };

    

    return (
        <>
            <div className="h-[100vh]">
                <div className="bg-gray-100">
                    <p className=" font-bold text-2xl p-4">Manage Brands and Colors  </p>

                    {/* Add button with dropdown feature */}
                    <div
                        onClick={() => setState((prev) => ({ ...prev, dropdown: !prev.dropdown }))}
                        className="p-4 cursor-pointer   inline-block">
                        <button
                            className="flex items-center font-semibold px-4 bg-blue-600 text-white rounded-md py-1 ">
                            Add<IoIosAdd className="text-2xl" /></button>
                        {state.dropdown && (<>
                            <div className="flex flex-col gap-2 ml-2 bg-white p-4">
                                <button
                                    onClick={() => setState((prev) => ({ ...prev, brand: !prev.brand, model:false,color:false }))}
                                    className=" text-black px-2 hover:bg-blue-500 hover:text-white"
                                >Add New Brands</button>
                                   <button
                                    onClick={() => setState((prev) => ({ ...prev, model: !prev.brand, brand:false,color:false }))}
                                    className=" text-black px-2 hover:bg-blue-500 hover:text-white"
                                >Add New Models</button>
                                <button
                                    onClick={() => setState((prev) => ({ ...prev, color: !prev.color, model:false, brand:false }))}
                                    className=" text-black px-2 hover:bg-blue-500 hover:text-white"
                                >Add New Colors</button>
                            </div>
                        </>)}
                    </div>

                    <div className="flex justify-center">
                        {/* Brand form section  */}
                        {state.brand && (
                            <>
                                <form onSubmit={handelBrandAdd}>
                                    <div className="flex flex-col gap-6 bg-blue-200/50 backdrop-blur-md rounded-xl  p-8">
                                        <div className="flex justify-between">
                                            <p>Add New Brand</p>
                                            <IoMdClose
                                                onClick={() => setState((prev) => ({ ...prev, brand: false }))}
                                                className="text-2xl cursor-pointer"
                                            />
                                        </div>
                                        <input
                                            className="px-4 py-1 my-2 border border-black"
                                            type="text" name="name" placeholder="Brand Name"
                                            value={brand.name}
                                            onChange={(e) => setBrand((prev) => ({ ...prev, name: e.target.value }))}
                                        />
                                        {brand.errors?.name && <p className="text-red-500 text-sm mt-2">{brand.errors.name}</p>}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            name="logo"
                                            onChange={(e) => {
                                                if (e.target.files && e.target.files[0]) {
                                                    const file = e.target.files[0];
                                                    // Assume you will upload this file and get a URL
                                                    const uploadedUrl = `http://localhost:3000/api/v1/${file.name}`; // Replace with actual URL after uploading

                                                    setBrand((prev) => ({ ...prev, logo: uploadedUrl }));
                                                }
                                            }}


                                        />
                                        {brand.errors?.logo && <p className="text-red-500 text-sm mt-2">{brand.errors.logo}</p>}
                                        <button
                                            type="submit"
                                            className=" bg-blue-600 text-white px-4 py-2 rounded-md"
                                        >Add Brand</button>
                                    </div>
                                </form>
                            </>
                        )}

                        {/* model form section  */}

                        {state.model && (
                            <>
                                <form onSubmit={handelModelAdd}>
                                    <div className="flex flex-col gap-2 bg-blue-200/50 backdrop-blur-md rounded-xl  p-8">
                                        <div className="flex justify-between">
                                            <p>Add New Model</p>
                                            <IoMdClose
                                                onClick={() => setState((prev) => ({ ...prev, model: false }))}
                                                className="text-2xl cursor-pointer"
                                            />
                                        </div>
                                        <input
                                            className="px-4 py-1 my-2 border border-black"
                                            type="text" name="name" placeholder="Model Name"
                                            value={model.name}
                                            onChange={(e) => setModel((prev) => ({ ...prev, name: e.target.value }))}
                                        />
                                        {model.errors?.name && <p className="text-red-500 text-sm mt-2">{model.errors.name}</p>}
                                        <label htmlFor="vehicleType">Vehicle Type</label>
                                        <select
                                         value={model.vehicleType}
                                         onChange={(e) => setModel((prev) => ({ ...prev, vehicleType: e.target.value }))}
                                        className="p-2"
                                        name="vehicleType" id="vehicleType">
                                            <option value="" >--</option>
                                            <option value="S">Scooty</option>
                                            <option value="B">Bike</option>
                                            <option value="C">Car</option>
                                        </select>
                                        {model.errors?.vehicleType && <p className="text-red-500 text-sm mt-2">{model.errors.vehicleType}</p>}

                                        <label htmlFor="vehicleType">Brand</label>
                                        <select 
                                         value={model.brandId}
                                         onChange={(e) => setModel((prev) => ({ ...prev, brandId: e.target.value }))}
                                        className="p-2"
                                        name="brandId" id="brandID">
                                        <option value="">--</option>
                                        {getBrand.map((el)=>(
                                            <>
                                            <option value={el._id}>{el.name.toUpperCase()}</option>
                                            </>
                                        ))}
                                        </select>
                                        {model.errors?.brandId && <p className="text-red-500 text-sm mt-2">{model.errors.brandId}</p>}
                                        <button
                                            type="submit"
                                            className=" bg-blue-600 text-white px-4 py-2 rounded-md"
                                        >Add Model</button>
                                    </div>
                                </form>
                            </>
                        )}


                        {/* Color form Section */}
                        {state.color && (
                            <>
                                <form onSubmit={handelColorAdd}>
                                    <div
                                        className="flex flex-col gap-4 bg-blue-200/50 backdrop-blur-md rounded-xl  p-8">
                                        <div className="flex justify-between">
                                            <p>Add New color</p>
                                            <IoMdClose
                                                onClick={() => setState((prev) => ({ ...prev, color: false }))}
                                                className="text-2xl cursor-pointer"
                                            />
                                        </div>
                                        <input
                                            className="px-4 py-1 my-2 border border-black"
                                            type="text" name="name" placeholder="Color"
                                            value={color.name}
                                            onChange={(e) => setColor((prev) => ({ ...prev, name: e.target.value }))}
                                            
                                        />
                                        {color.errors?.name && <p className="text-red-500 text-sm mt-2">{color.errors.name}</p>}
                                        <input
                                            className="px-4 py-1 my-2 border border-black"
                                            type="text" name="hex" placeholder="Color Code"
                                            value={color.hex}
                                            onChange={(e) => setColor((prev) => ({ ...prev, hex: e.target.value }))}
                                        />
                                        {color.errors?.hex && <p className="text-red-500 text-sm mt-2">{color.errors.hex}</p>}
                                        <button type="submit"
                                            className=" bg-blue-600 text-white px-4 py-2 rounded-md"
                                        >Add Color
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                    {/* Select sections */}
                    <div className="py-4">
                        <p className="p-4 font-bold text-2xl">Select Section</p>
                        <div className="flex flex-col font-semibold px-4">
                            <Link to={"brand"}>Brand Section</Link>
                            <Link to={"model"}>Model Section</Link>
                            <Link to={"color"}>Color Section</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}