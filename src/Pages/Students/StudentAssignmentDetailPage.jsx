import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import LoaderContext from '../../Context/LoaderContext';
import api from '../../api/api';
import { LiaClipboardListSolid } from 'react-icons/lia';
import { Button, Card } from 'antd';
import { FaPlus } from 'react-icons/fa';
import AssignmentSubmitFormModal from '../../Components/AssignmentSubmitFormModal/AssignmentSubmitFormModal';


const { Meta } = Card;

function StudentAssignmentDetailPage() {
    const { classId, assignmentId } = useParams();
    const { loader, setLoader } = useContext(LoaderContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [detail, setDetail] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        getClassDetail();
    }, [])


    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const getClassDetail = () => {
        setLoader(true);
        api.get(`/api/classes/student/class/${classId}`)
            .then(res => {
                setDetail(res.data);
                setLoader(false);
            })
            .catch(err => {
                toast.error(err.response.data);
                setLoader(false);
            });
    }

    return (
        <div className='p-4 ps-5'>
            <header className="bg-teal-600 text-white p-4 rounded-lg mb-4">
                <h1 className="text-2xl">{detail?.name}</h1>
                <p className="text-md">{detail?.description}</p>
            </header>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-2'>
                <section className='col-span-2'>
                    <div className="bg-gray-100 rounded-lg ps-2">
                        <div className='mb-4'>
                            <h2 className="text-3xl flex gap-3 items-center"><LiaClipboardListSolid /> Assignment 3</h2>
                            <h3 className='ms-10 mt-2 text-gray-700'>
                                Zain Khan • Feb 27
                            </h3>
                        </div>
                        <div>
                            <h4 className='text-right pe-3 font-bold'>Due Mar 3</h4>
                        </div>
                        <div className='bg-white p-4 rounded-lg shadow mb-4 mt-3'>
                            <div>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum quod modi, deserunt, qui voluptate minus reprehenderit ad molestias non quis iusto reiciendis. Quae ullam inventore expedita? Earum aperiam natus velit.</p>
                            </div>
                            <div className='border-t-2 mt-4 pt-4'>
                                <h2 className='text-xl font-bold mb-3'>File:</h2>
                                <Card
                                    hoverable
                                    cover={
                                        <img className='!max-w-[100px] w-full !rounded-lg' alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />

                                    }
                                    className='flex flex-col w-full sm:flex-row items-center'
                                >
                                    <Meta
                                        title="Dummy-text.pdf" // filename
                                    // description="www.instagram.com"
                                    />
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-white p-4 rounded-lg shadow h-max">
                    <h2 className="text-xl mb-4">Your Work</h2>
                    <div className='mb-4 flex flex-col gap-3'>
                        {/* submitted file name */}
                        <p className='bg-gray-100 p-4 rounded-md shadow text-center py-3 px-2 font-bold'>
                            Dummy-text.pdf
                        </p>
                        {/* submitted file link */}
                        <p className='bg-gray-100 p-4 rounded-md shadow text-center py-3 px-2 font-bold'>
                            https://dummyjson.com
                        </p>
                    </div>

                    {/* if assignment is not submitted */}
                    {/* <div>
                        <Button className='w-full text-blue-600' onClick={showModal}><FaPlus /> Add or create</Button>
                    </div> */}
                    {/* if assignment is submitted */}
                    <div>
                        <Button className='w-full text-blue-600' onClick={showModal}>Unsubmit</Button>
                    </div>
                </section>
            </div>
            <AssignmentSubmitFormModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} handleCancel={handleCancel} showModal={showModal} />
        </div>
    )
}

export default StudentAssignmentDetailPage