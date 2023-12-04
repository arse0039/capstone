import styled from 'styled-components';

const Nav = styled.nav`
    position: relative;
    background-color: #1a1e23;
    display: flex;
    flex-wrap: wrap;
    min-height: 6vh;
    align-items: center;
    justify-content: flex-start; 
    overflow-x: hidden;
    transition: 0.3s;
`;

const StyledLink = styled.a`
    color: #fff; 
    position: relative;
    text-decoration: none;

    &:after {
        position: absolute;
        content: "";
        top: 100%;
        left: 0;
        width: 100%;
        height: 3px;
        background: lightblue;
        transform: scaleX(0);
        transform-origin: right;
        transition: transform 0.4s;
    }

    &:hover {
        color: #fff; 
        text-decoration: none; 
    }

    &:hover:after {
        transform: scaleX(1);
        transform-origin: left;
        text-decoration: none;
    }
`;

const StyledUl = styled.ul`
    display: flex;
    justify-content: flex-start;
    list-style: none;
    padding: 0;
`;

const StyledListItem = styled.li`
    color: #fff; !important
    flex: 1;
    font-size: 25px;
    padding-left: 20px;
    padding-right: 20px;
    margin-right: 20px;
    padding-top:8px;
    text-decoration: none;

    &:last-child {
        margin-right: 0;
    }
`;

interface NavProps {
    navLinks: {
        name: string;
        url: string;
    }[];
}

export const NavBar = ({ navLinks }: NavProps) => {
    return (
        <Nav>
            <StyledUl>
                {navLinks.map((navLink, index) => (
                    <StyledListItem key={index}>
                        <StyledLink href={navLink.url}>{navLink.name}</StyledLink>
                    </StyledListItem>
                ))}
            </StyledUl>
        </Nav>
    );
};
