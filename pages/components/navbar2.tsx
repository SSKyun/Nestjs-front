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
  font-size: 18px;
  font-weight: bold;
  text-decoration: none;
  writing-mode: horizontal-tb;
`;

const Page = () => {
    return (
      <div>
        <Navbar>
          <NavContainer>
            <Logo src="" alt="Logo" />
            <NavLink href="#">Navbar</NavLink>
          </NavContainer>
          <NavLinks>
            <NavItem>
              <NavLink href="#">PageTop</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">메뉴2</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">메뉴3</NavLink>
            </NavItem>
          </NavLinks>
        </Navbar>
        {/* 나머지 콘텐츠 */}
      </div>
    );
  };

export default Page;