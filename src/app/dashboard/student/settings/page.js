'use client'
import { useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import LoaderUnder from '@/components/LoaderUnder';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const Settings = () => {
  const user = useSelector((state) => state.auth);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [linkedinUrl, setLinkedinUrl] = useState(user.linkedinUrl);
  const [twitterUrl, setTwitterUrl] = useState(user.twitterUrl);
  const [githubUrl, setGithubUrl] = useState(user.githubUrl);
  const [bio, setBio] = useState(user.bio);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const dispatch = useDispatch()
  useEffect(() => {
    const dispatched = async () => {
      setIsSubmitting(true);
      dispatch({ type: 'AUTH_STATE_CHANGED' });
      setIsSubmitting(false);
    }
    dispatched()
  }, [dispatch,user.bio]);



  const handleFileChange = (e, setBase64) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setBase64(reader.result); // Set base64 string
    };

    if (file) {
      reader.readAsDataURL(file); // Convert to base64
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const url = '/api/profile'
    const formData = { userId: user?.userId, linkedinUrl: linkedinUrl, twitterUrl: twitterUrl, githubUrl: githubUrl, bio: bio, profileImage: profileImage, coverImage: coverImage, userType: user?.userType, teamId: user?.teamId, mentorId: user?.mentorId, projectId: user?.projectId, examinerId: user?.examinerId }
    console.log(formData)
    try {
      const response = await axios.put(url, formData, {
        headers: {
          'Authorization': `Bearer ${user?.token}`, // Correct format for Bearer token
          'Content-Type': 'application/json',  // If you're using FormData, make sure Content-Type is set properly
        },
      })


      if (response.data.status === 201) {
        toast.success('Settings updated successfully!');
      } else {
        const errorData = response.data || {};
        toast.error(errorData.message || 'Failed to update settings');
      }
    } catch (error) {
      toast.error('An error occurred while updating settings');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isSubmitting ? <LoaderUnder /> : <>
        <div className="mx-auto max-w-270">
          <Breadcrumb pageName="Settings" />

          <div className="grid grid-cols-5 gap-8">
            <div className="col-span-5 xl:col-span-5">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Personal Information
                  </h3>
                </div>
                <div className="p-7">
                  <form onSubmit={handleFormSubmit}>

                    <div className="mb-5.5">
                      <label htmlFor="linkedinUrl" className="mb-3 block text-sm font-medium text-black dark:text-white">
                        LinkedIn URL
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-[#C5F2DD] py-3 px-4 text-black focus:border-black focus-visible:outline-none"
                        type="url"
                        id="linkedinUrl"
                        placeholder="https://www.linkedin.com/in/your-profile"
                        value={linkedinUrl}
                        onChange={(e) => setLinkedinUrl(e.target.value)}
                      />
                    </div>

                    <div className="mb-5.5">
                      <label htmlFor="twitterUrl" className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Twitter URL
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-[#C5F2DD] py-3 px-4 text-black focus:border-black focus-visible:outline-none"
                        type="url"
                        id="twitterUrl"
                        placeholder="https://www.twitter.com/your-handle"
                        value={twitterUrl}
                        onChange={(e) => setTwitterUrl(e.target.value)}
                      />
                    </div>

                    <div className="mb-5.5">
                      <label htmlFor="githubUrl" className="mb-3 block text-sm font-medium text-black dark:text-white">
                        GitHub URL
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-[#C5F2DD] py-3 px-4 text-black focus:border-black focus-visible:outline-none"
                        type="url"
                        id="githubUrl"
                        placeholder="https://www.github.com/your-username"
                        value={githubUrl}
                        onChange={(e) => setGithubUrl(e.target.value)}
                      />
                    </div>

                    <div className="mb-5.5">
                      <label htmlFor="bio" className="mb-3 block text-sm font-medium text-black dark:text-white">
                        BIO
                      </label>
                      <textarea
                        className="w-full rounded border border-stroke bg-[#C5F2DD] py-3 px-4 text-black focus:border-black focus-visible:outline-none"
                        name="bio"
                        id="bio"
                        rows={6}
                        placeholder="Write your bio here"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                      ></textarea>
                    </div>

                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">


                      <div className="flex flex-col gap-5.5 p-6.5">


                        <div>
                          <label className="mb-3 block text-black font-medium dark:text-white">
                            Your Photo
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, setProfileImage)}
                            className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-[#C5F2DD] file:py-3 file:px-5 file:hover:bg-black file:hover:bg-opacity-10 focus:border-black active:border-black disabled:cursor-default disabled:bg-[#C5F2DD] dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white text-black dark:focus:border-black"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                      <div className="flex flex-col gap-5.5 p-6.5">


                        <div>
                          <label className="mb-3 block text-black font-medium dark:text-white">
                            Cover Image
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, setCoverImage)}
                            className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-[#C5F2DD] file:py-3 file:px-5 file:hover:bg-black file:hover:bg-opacity-10 focus:border-black active:border-black disabled:cursor-default disabled:bg-[#C5F2DD] dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white text-black dark:focus:border-black"
                          />
                        </div>
                      </div>

                    </div>

                    <div className="flex justify-end gap-4.5 my-5">
                      <button
                        type='submit'
                        className="flex justify-center rounded bg-black py-2 px-6 font-medium text-white hover:bg-opacity-90"
                        disabled={isSubmitting} // Disable button while submitting
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>}



    </>
  );
};

export default Settings;
