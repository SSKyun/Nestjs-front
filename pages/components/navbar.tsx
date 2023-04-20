import { kakaoInit } from '@/utils/kakao/kakaoinit';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Navbar = styled.nav`
  position: fixed;
  top: 0;
  left: 40px;
  height: 100vh;
  width: 100px;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  z-index: 1;
`;

const Logo = styled.img`
  height: 50px;
  width: 50px;
  object-fit: contain;
`;

const NavLinks = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  
`;

const NavItem = styled.li`
  margin: 30px 0;
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NavLink = styled.a`

  color: #FFFFFF;
  font-size: 17px;
  font-weight: bold;
  text-decoration: none;
  writing-mode: horizontal-tb;
`;


const LOGOUT_URL = 'http://localhost:8000/auth/logout';


const Page = () => {
  const router = useRouter();
    const [userName, setUserName] = useState<string | null>(null);

    const logout = () => {
        axios
          .post(LOGOUT_URL)
          .then(() => {
            //어차피 kakao-refresh-token을 받아오지 않으니까 localStorage안에 들어있는 값은 새로고침 시 없어지니까
            // 로컬에서 refresh-token을 발급 받은 걸 사용하면 된다.
            localStorage.removeItem('name');
            localStorage.removeItem('accessToken');
            typeof window !== 'undefined' && window.localStorage.removeItem('expirationTime');
            window.alert('로그아웃 되었습니다.');
            router.replace('/');
          })
          .catch((err) => {
            console.log(err);
          });
          setUserName(null);
      };

      useEffect(() => {
        const name = typeof window !== 'undefined' && window.localStorage.getItem('name');
        const savedTime = typeof window !== 'undefined' && window.localStorage.getItem('savedTime');
        const now = Date.now();
        const THIRTY_MINUTES_IN_MS = 30 * 60 * 1000;
      
        if (name && savedTime && now - Number(savedTime) < THIRTY_MINUTES_IN_MS) {
          setUserName(name);
        } else {
          window.localStorage.removeItem('name');
          window.localStorage.removeItem('savedTime');
        }
        const kakao = kakaoInit();
      
        return () => {
          if (kakao && kakao.Auth.getAccessToken()) {
            kakao.Auth.logout();
          }
        };
        
      }, []);
      
    return (
      <div>
        <Navbar>
          <NavContainer>
            <NavLink href="/">アグリート</NavLink>
          </NavContainer>
          <NavLinks>
            <NavItem>
              <NavLink href="#">PageTop</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Controller</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">test</NavLink>
            </NavItem>
            <NavItem>
            {userName ? (
              <>
                <div className='text-white font-bold' >{`Hello, ${userName}`}</div>
                <button className='text-white font-bold' onClick={logout}>Sign Out</button>
              </>
            ) : (
              <Link href="/login">
                <p className='text-white font-bold'>Sign In</p>
              </Link>
            )}
            </NavItem>
          </NavLinks>
        </Navbar>
        {/* 나머지 콘텐츠 */}
      </div>
    );
  };

export default Page;