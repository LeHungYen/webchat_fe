import style from './index.module.scss'
import { LuPencil } from "react-icons/lu";
import { IoAddOutline } from "react-icons/io5";

export function Photos() {
    const pictures = [
        'https://plus.unsplash.com/premium_photo-1706026427244-3b3df84382d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8',
        'https://images.unsplash.com/photo-1695273718260-cf359edd1b5d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8',
        'https://images.unsplash.com/photo-1705750164473-c0efa38c6005?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
        'https://images.unsplash.com/photo-1683009427598-9c21a169f98f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8',
        'https://images.unsplash.com/photo-1699870798609-b5c3e7e5900d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
        'https://images.unsplash.com/photo-1699800900071-ae073285ca02?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
        'https://images.unsplash.com/photo-1705798543468-5b951da25e1e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8',
        'https://plus.unsplash.com/premium_photo-1666256629471-32b4eedd9638?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8',
        'https://images.unsplash.com/photo-1703159424431-a02e4890a8a6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D',
        'https://plus.unsplash.com/premium_photo-1676559807274-3a7925da67ed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1682687982298-c7514a167088?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1705917676092-72ae4a46cab3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1706119624235-7302d4320c81?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1705522369595-40d0b2667739?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D',
        'https://plus.unsplash.com/premium_photo-1665203478513-719b7a2cd851?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxN3x8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1704863619745-be3fe5a62f74?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1706126199160-1b3867dbf587?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1706169582307-8ae586631e8a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNXx8fGVufDB8fHx8fA%3D%3D',
        'https://plus.unsplash.com/premium_photo-1702834009180-83d5d37b5418?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyN3x8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1706106608771-aebb15ebf321?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1706125356134-a20ea29b412b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzM3x8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1705947172050-f930e2856301?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0MHx8fGVufDB8fHx8fA%3D%3D'
    ]

    return <div className={style.photos}>
        <div className={style.title}>
            <p>Photos</p>
        </div>

        <div className={style.menu}>
            <ul>
                <li>Tagged photos</li>
                <li>Photos</li>
                <li>Albums</li>
            </ul>
        </div>

        <div className={style.photo}>
            <ul className={style.taggedPhotos}>
                {pictures.map((picture, index) => (
                    <li key={index}>
                        <div className={style.picture}>
                            <img src={picture}></img>
                        </div>

                        <div className={style.edit}>
                            <LuPencil className={style.icon} />
                        </div>
                    </li>
                ))}
            </ul>
{/* 
            <ul className={style.pictures}>
                {pictures.map((picture, index) => (
                    <li key={index}>
                        <div className={style.picture}>
                            <img src={picture}></img>
                        </div>

                        <div className={style.edit}>
                            <LuPencil className={style.icon} />
                        </div>
                    </li>
                ))}
            </ul> */}

            {/* <ul className={style.albums}>
                <li>
                    <div className={style.addIcon}>
                        <IoAddOutline className={style.icon} />
                    </div>
                    <p className={style.albumName}>Create album</p>
                </li>

                {pictures.map((picture, index) => (
                    <li key={index}>
                        <div className={style.picture}>
                            <img src={picture}></img>
                        </div>
                        <p className={style.albumName}>Album undefine</p>
                        <p className={style.item}>6 items</p>

                        <div className={style.edit}>
                            <LuPencil className={style.icon} />
                        </div>
                    </li>
                ))}
            </ul> */}
        </div>
    </div>
}