import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { CgProfile, CgMenu } from 'react-icons/cg';
import { BsCart3, BsSearch } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { stringify } from 'postcss';
import { getCookie } from 'cookies-next';
import { setUser } from '../redux/slices/userLogin';


function Header({ select }) {
    const router = useRouter();
    const dispach = useDispatch();
    const info = useSelector(state => state.userInfo.value);
    const shopItems = useSelector(staet => staet.cart.value)
    const [counter, setCounter] = useState('');
    const parse = (string) => JSON.parse(string);
    

    useEffect(() => {
        // shopItems.map(el => {
        //     // let temp;
        //     // temp=el.number;
        //     // setCounter(+temp)
        // } )
        const tempt=[];
        shopItems.forEach(element => {
            tempt.push(element.number)
        });
        
         setCounter( tempt.reduce((a,b)=>a+b,0));
         
        
    }, [shopItems]);
 console.log(shopItems)


    useEffect(() => {
        const data = getCookie('user');
      (data)? dispach(setUser(parse(data))):null;
    
    }, []);








    const [toggleState, setToggle] = useState(false);
    const items = [
        {
            name: 'همه محصولات',
            svg: '/all.svg',
            href: "/"
        },
        {
            name: 'لوازم دیجیتال',
            svg: '/phone.svg',
            href: "/categories/digital-tools"
        },
        {
            name: 'لوازم خانگی',
            svg: '/refrigator.svg',
            href: "/categories/furniture"
        },
        {
            name: 'لوازم تحریر',
            svg: '/pen.svg',
            href: "/categories/stationery"
        },
        {
            name: 'لوازم آرایشی',
            svg: '/makeup.svg',
            href: "/categories/makeup"
        },
        {
            name: 'محصولات غذایی',
            svg: '/apple.svg',
            href: "/categories/foods"
        }];

    return (

        <>
            <div className='hidden md:flex flex-col'>
                <div className=' flex  items-center justify-center   w-full    gap-[10%] p-[5px]'>
                    <div className='flex gap-[40px] '>
                        <div className='flex rtl items-center gap-2'>
                            <CgProfile className=' w-[50px] h-[50px] text-[#575563]  cursor-pointer' onClick={() => router.push('/authentication/Login')} />
                            <div className={(info === null) ? 'hidden' : 'flex flex-col  '}> <i className='font-semibold text-lg '> {info?.fName}  {info?.lName}</i> <i>{info?.userName}</i></div>
                        </div>

                        <span className="relative inline-block cursor-pointer" onClick={() => (info !== '') ? router.push('/cart/cart') : router.push('/authentication/Login')}>
                            <BsCart3 className='w-[45px] h-[45px] text-[#575563]' />
                            <span className="absolute top-2 right-5 inline-flex items-center justify-center px-1 py-1 text-md font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-[#00B5CC] rounded-full">
                                {counter}
                            </span>
                        </span>



                    </div>
                    <div className='flex items-center border-[2px] border-cyan-800  cursor-pointer   w-[25%] h-[45px] p-[20px] rounded-md justify-between'>
                        <BsSearch className=' w-[25px] h-[25px] ' fill='#575563' />
                        <input type='text' className='border-0 outline-0  w-[300px] text-right' placeholder='جست وجوی محصول' />
                    </div>
                    <span className='rounded-[50%] w-[70px] h-[70px] bg-[#00B5CC] text-white text-sm  flex justify-center items-center text-center p-5 '>لوگوی فروشگاه</span>
                </div>

                <div className=' flex w-full h-[60px] bg-[#575563]  flex-row-reverse text-white justify-center '>
                    {items.map(e => (
                        <Link href={e.href} key={e.href}>

                            <div className={(select == e.href) ? 'bg-[#00B5CC] rounded-[3px] p-3  items-center flex flex-row-reverse  gap-5 cursor-pointer h-[62px]' : 'hover:bg-[#00B5CC] hover:rounded-[3px] p-3  items-center flex flex-row-reverse  gap-5 cursor-pointer border-x-[1px] border-[#747380]'}  >
                                <span >{e.name}</span>
                                <Image src={e.svg} width='30' height='30' alt={e.name} />
                            </div>

                        </Link>
                    ))}

                </div>
            </div>


            {/*  mobile header */}

            <div className='flex flex-col  md:hidden overflow-y-hidden' >
                <div className='w-full  flex  items-center justify-center py-2 px-6   gap-[4rem] bg-[#e4e3e3]  cursor-pointer'>
                    <div className='flex  gap-[20px] justify-center items-center'>
                        <BsSearch className=' w-[30px] h-[30px] cursor-pointer' fill='#575563 ' />
                        <span className="relative inline-block">
                            <BsCart3 />
                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-[20px] font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                                99
                            </span>
                        </span>
                    </div>

                    <span className='rounded-[50%] w-[70px] h-[70px] bg-[#00B5CC] text-white text-sm cursor-pointer  flex justify-center items-center text-center p-5 '>لوگوی فروشگاه</span>
                    <Image src='/menu.svg' width='40px' height='40px' className=' text-[#575563] cursor-pointer ' onClick={() => setToggle(!toggleState)} />
                </div>
                {(toggleState) ?
                    <div className='flex flex-row-reverse justify-between w-full h-full duration-200    bg-[rgba(0,0,0,0.2)]' id='menuContainer' onClick={(e) => {
                        (e.target.id === 'menuContainer') ? setToggle(false) : '';
                    }}>
                        <div className='w-[80vw] h-[100vh]  bg-[#575563]  flex flex-col  ' >
                            <div className='menuItems border-t-0 p-3  items-center flex flex-row-reverse  gap-[20px] cursor-pointer' onClick={() => router.push('/authentication/Login')}>

                                <CgProfile className=' w-[40px] h-[40px] text-[#ffffff]  cursor-pointer' />
                                <span className='text-[20px] text-white'>پروفایل</span>


                            </div>

                            {items.map(e => (
                                <Link href={e.href}>
                                    <div className='menuItems  p-3  items-center flex flex-row-reverse  gap-[20px] cursor-pointer text-white' >
                                        <Image src={e.svg} width='40' height='40' alt={e.name} />
                                        <span className='text-[18px]'>{e.name}</span>

                                    </div>
                                </Link>
                            ))}
                        </div>
                        {/* <AiOutlineClose className='w-8 h-8  duration-200 ' fill='#575563' onClick={()=>setToggle(false)} /> */}
                    </div>
                    : null
                }
            </div>
        </>
    )

}
export default Header







































































