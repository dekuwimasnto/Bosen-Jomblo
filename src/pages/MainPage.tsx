import { IonPage, IonHeader, IonToolbar, IonTitle, IonMenu, IonButtons, IonMenuButton, IonIcon, IonButton, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonAvatar, IonItemSliding, IonItemOptions, IonItemOption, IonItem, IonLabel, IonText, useIonLoading } from '@ionic/react';
import React, { useContext, useEffect, useRef } from "react";
import {ban, create, femaleOutline, heart, list, mailOutline, male, maleOutline, personOutline, settings, trash, videocamOutline, warning} from 'ionicons/icons';

import './MainPage.css'
import { Swiper, SwiperSlide } from 'swiper/react';

import { Autoplay, A11y, Navigation, Pagination, Scrollbar } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import '../theme/variables.css';
import FriendsContext from '../data/friend-context';



const MainPage:React.FC<{checked:boolean}>=(props)=>{
    const slidingOptionRef = useRef<HTMLIonItemSlidingElement>(null);
    const [present, dismiss] = useIonLoading();

    const friendsCtx = useContext(FriendsContext);
    
    useEffect(()=>{
        console.log(friendsCtx.friends);
    },[]);

    const callFriendHandler=()=>{
        console.log("calling");
    }
    const blockFriendhandler=(event:React.MouseEvent)=>{
        // event.stopPropagation();
        slidingOptionRef.current?.closeOpened();
        console.log("blocking");
    }
    const deletingFriendHandler=(event:React.MouseEvent)=>{
        // event.stopPropagation();
        slidingOptionRef.current?.closeOpened();
        console.log("Deleting");
    }
    const EditingFriendHandler=(name:string, photo: string,gender:string, description:string , id:string)=>{
        // event.stopPropagation();
        slidingOptionRef.current?.closeOpened();
        console.log("store friend");
        
        friendsCtx.storeFriend(name,photo,gender,description,id);
        present({
            message: 'Loading...',
            duration: 500,
        })
    }
    
    const icon=()=>{
        console.log("masuk icon")
    }

    return(
        <>
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton></IonMenuButton>
                    </IonButtons>
                    <IonTitle>Bosen Jomblo</IonTitle>
                    <IonButtons slot='end'>
                        <IonButton onClick={icon} href='/profile-page'>
                            <IonIcon icon={personOutline} size="large" />   
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent >
                <IonGrid>
                    <IonRow>
                        <Swiper modules={[Navigation, Pagination, Scrollbar, A11y]} spaceBetween={5} slidesPerView={3} onSlideChange={() => console.log('slide change')}onSwiper={(swiper) => console.log(swiper)}  pagination={{ clickable: true }} >
                            {friendsCtx.friends.slice(1,10).map(friend =>( 
                                friend.love == 0 ? (
                            <IonCol size='12'>
                                <SwiperSlide>
                                    <IonCard>
                                        <IonAvatar className='avatar'>
                                            <img alt="Silhouette of a person's head" src={friend.photo} />
                                        </IonAvatar>
                                        <IonCardHeader>
                                            <IonCardSubtitle className='ion-text-center' >{friend.name}</IonCardSubtitle>
                                        </IonCardHeader>
                                    </IonCard>
                                </SwiperSlide>
                            </IonCol>
                            ):
                            (
                                <IonGrid></IonGrid>
                            )
                            ))}
                        </Swiper>
                    </IonRow>
                </IonGrid>
                {friendsCtx.friends.map(friend =>( 
                    friend.love == 0 ? (
                    <IonItemSliding  ref={slidingOptionRef} key={friend.id}>
                        <IonItemOptions >
                            <IonItemOption color='primary' onClick={() =>EditingFriendHandler(friend.name,friend.photo,friend.gender,friend.description,friend.id)}>
                                <IonIcon slot="icon-only" icon={heart}/>
                            </IonItemOption>
                        </IonItemOptions>
                        <IonItem lines="full" button onClick={callFriendHandler}>
                            <IonAvatar className="ion-margin-end">
                                <img alt="Silhouette of a person's head" src={friend.photo} />
                            </IonAvatar>
                            <IonGrid>
                                <IonCol>
                                    <IonLabel className='ion-text-lg-left'>{friend.name}</IonLabel><br></br>
                                    <IonLabel>{friend.description}</IonLabel>
                                    <IonLabel>
                                        <IonIcon slot='start' icon= {friend.gender == "male" ? femaleOutline : maleOutline}  />
                                        {friend.gender}
                                    </IonLabel>
                                </IonCol>
                            </IonGrid>                 
                        </IonItem>
                    </IonItemSliding>
                    ):
                    (
                        <IonGrid></IonGrid>
                    )
                ))}    
            </IonContent>
        </IonPage>
        </>
    );
}

export default MainPage;