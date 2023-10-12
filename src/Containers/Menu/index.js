import React, { useState, useContext, useEffect } from "react";
import CartContext from "../../context";
import { Card, Button, Row, Col, Modal,Rate } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { food } from "../../data";
import { toast } from 'react-toastify';

const { Meta } = Card;

function Menu() {
    const [likedItems, setLikedItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const { addToCart, removeFromCart } = useContext(CartContext);
    const oldCartData = localStorage.getItem('historied');

    useEffect(()=> {
      if(oldCartData){
        setLikedItems(JSON.parse(oldCartData));
      }
    },[])

    const openModal = (item) => {
        setSelectedItem(item);
        setModalVisible(true);
    };

    const closeModal = () => {
        setSelectedItem(null);
        setModalVisible(false);
    };

    const toggleLike = (item) => {
        if (likedItems.includes(item.id)) {
            removeFromCart(item.id)
            setLikedItems(likedItems.filter((id) => id !== item.id));
            toast.error(` Remove ${item.name} from liked list !`, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            addToCart(item.id)
            setLikedItems([...likedItems, item.id]);
            toast.success(`Added ${item.name} to liked list`, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    return (
        <div className="container mt-28 p-5">
            {/* ... (other code) */}
            <hr className="my-6"></hr>
            <Row gutter={[16, 16]}>
                {food.map((item, index) => (
                    <Col key={index} xs={24} sm={12} md={8} lg={6} style={{ overflow: 'hidden' }}>
                        <Card
                            hoverable
                            style={{ width: "95%", position: 'relative' }}
                            cover={
                                <>
                                    {likedItems.includes(item.id) ? (
                                        <HeartFilled
                                            style={{
                                                position: "absolute",
                                                top: "10px",
                                                left: "35%",
                                                fontSize: "24px",
                                                color: "red",
                                                cursor: "pointer",
                                            }}
                                            onClick={() => toggleLike(item)}
                                        />
                                    ) : (
                                        <HeartOutlined
                                            style={{
                                                position: "absolute",
                                                top: "10px",
                                                left: "35%",
                                                fontSize: "24px",
                                                cursor: "pointer",
                                                color: '#fff'
                                            }}
                                            onClick={() => toggleLike(item)}
                                        />
                                    )}
                                    <img
                                        alt={item.name}
                                        src={item.image}
                                        style={{ objectFit: "cover", height: "300px" }}
                                        onClick={() => openModal(item)}

                                    />
                                    
                                </>
                            }
                        >
                            <Meta title={item.name} description={item.description} />
                            <Rate allowHalf defaultValue={4} />

                        </Card>
                    </Col>
                ))}
            </Row>
            <Modal
                title={selectedItem ? selectedItem.name : ""}
                visible={modalVisible}
                onCancel={closeModal}
                footer={[
                    <Button key="close" onClick={closeModal}>
                        Close
                    </Button>,
                ]}
            >
                {selectedItem && (
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                        <img
                            alt={selectedItem.name}
                            src={selectedItem.image}
                            style={{ objectFit: "cover", height: "200px",width:'200px' }}
                        />
                        <span style={{padding:'30px'}}>
                           <p style={{padding:'5px'}}>Name: {selectedItem.name}</p>
                           <p style={{padding:'5px'}}>Description: {selectedItem.description}</p>
                           <p style={{padding:'5px'}}>Category: {selectedItem.category}</p>
                           <p style={{padding:'5px'}}>Price: {selectedItem.price}</p>
                           </span>
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default Menu;