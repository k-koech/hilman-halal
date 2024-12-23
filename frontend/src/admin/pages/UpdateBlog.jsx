import  { useContext, useEffect, useRef, useState } from 'react';
import { AiFillFileAdd } from 'react-icons/ai';
// import { BlogContext } from '../../context/BlogContext';
import { useParams } from 'react-router-dom';
import config from "../../config.json"

const UpdateBlog = () => {
   
  const {id } = useParams()

  // const {updateBlog, posts} = useContext(BlogContext)
  const post = posts && posts.find((post)=>post.id==id)

  console.log("xxxxx ",post);

  const [title, setTitle] = useState( post?.title);
  const [link, setLink] = useState();
  const [file, setFile] = useState();

  const [tag, setTag] = useState(post?.tag);
  const [description, setDescription] = useState(post?.description);
  const [displayFile, setDisplayFile] = useState();

    const handleSubmit = e => 
    {    
      e.preventDefault();

      let formData = new FormData()
      formData.append("title", title);
      formData.append("link", link);
      formData.append("tag", tag);
      formData.append("description", description);
      if(file){
        formData.append("file", file);
      }

      // updateBlog(id, formData);

 
    };

  return (
    <div className="container mx-auto py-8">
       <div className="flex justify-center items-center px-4">
          <div className="bg-white rounded-lg shadow-lg md:w-[65vw] xl:w-[35vw]">
            <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md">
                <h1 className=' text-xl font-semibold'>Add Blog</h1>

                <div className="mt-10">
                <form onSubmit={handleSubmit}>
                    <div className="flexflex-col mb-6">
                        <label className="flex justify-start mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Title:</label>
                        <div className="relative">
                            <input type="text" value={title || ""}  onChange={(e) => setTitle(e.target.value)} className="text-sm sm:text-base placeholder-gray-500 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="Title" />
                        </div>
                    </div>

                    <div className="flexflex-col mb-6">
                        <label className="flex justify-start mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Link:</label>
                        <div className="relative">
                            <input type="text" value={link || ""}  onChange={(e) => setLink(e.target.value)} className="text-sm sm:text-base placeholder-gray-500 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-sky-400" placeholder="Link" />
                        </div>
                    </div>

                    <div className="flexflex-col mb-6">
                        <label className="flex justify-start mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Text</label>
                        <div className="relative">
                            <textarea rows={6} value={description ||""}  onChange={(e) => setDescription(e.target.value)} className="text-sm sm:text-base placeholder-gray-500 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="Enter your text here ... " />
                        </div>
                    </div>

                    <div className="flexflex-col mb-6">
                        <label className="flex justify-start mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Tag:</label>
                        <select value={tag || ""}  onChange={(e) => setTag(e.target.value)} className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                          <option value="">Select</option>
                          <option value="DevOps Blogs">DevOps Blogs</option>
                          <option value="Community News">Community News</option>
                        </select>
                    </div>

                    <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Blog image(optional)</label>
                    <hr/>
                    <div className='flex'>
                      {displayFile?
                      <img className="h-16 object-cover" src={displayFile || ""  } alt="" />
                      :
                      <img className="h-16 object-cover" src={config.IMAGES_URL+ (post && post.image)  } alt="" />
                      }                      
                      <div className='flex items-center mx-5 p-3 bg-gray-100'>
                          <input type="file"  onChange={(e) => {setFile(e.target.files[0]); setDisplayFile(URL.createObjectURL(e.target.files[0])); }} className="rounded "/>
                      </div>
                    </div>
                    </div>
                            

                    <div className="flex w-full">
                    <button type="submit" className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in">
                        <span className="mr-2 uppercase">Submit</span>
                    </button>
                    </div>
                </form>
                </div>
                
            </div>

          </div>
        </div>
    
    </div>
  );
};

export default UpdateBlog;
