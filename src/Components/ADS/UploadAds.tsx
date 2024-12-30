

export default function UploadAds() {



    return <>
        <div className='py-2 px-5 h-[100vh]'>
            <h1 className="text-2xl font-bold mb-4">Upload Ad</h1>
            <form className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium">
                        Ad Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full border rounded p-2"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="image" className="block text-sm font-medium">
                        Ad Image
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        className="w-full"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="startDate" className="block text-sm font-medium">
                        Start Date
                    </label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        className="w-full border rounded p-2"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium">
                        Expiry Date
                    </label>
                    <input
                        type="date"
                        id="expiryDate"
                        name="expiryDate"
                        className="w-full border rounded p-2"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="uploadDate" className="block text-sm font-medium">
                        Date of Upload
                    </label>
                    <input
                        type="text"
                        id="uploadDate"
                        name="uploadDate"
                        readOnly
                        className="w-full border rounded p-2 bg-gray-100"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                    Upload Ad
                </button>


            </form>

        </div>
    </>


}
