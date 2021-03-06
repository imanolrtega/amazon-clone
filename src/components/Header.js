import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { auth } from "../firebase";
import { SettingsInputSvideoRounded } from "@material-ui/icons";

const Header = ({ cartItems, user, signOut }) => {
  const getCountCart = () => {
    let count = 0;
    cartItems.forEach((item) => {
      count += item.product.quantity;
    });

    return count;
  };

  return (
    <Container>
      <Link to="/">
        <HeaderLogo>
          <img
            alt="amazon-logo"
            src={
              "https://www.nicepng.com/png/full/16-167642_amazon-logo-amazon-logo-white-text.png"
            }></img>
        </HeaderLogo>
      </Link>

      <HeaderOptionAddress>
        <LocationOnIcon />
        <HeaderOptionAddressText>
          <OptionLineOne>Deliver to</OptionLineOne>
          <OptionLineTwo>Argentina</OptionLineTwo>
        </HeaderOptionAddressText>
      </HeaderOptionAddress>

      <HeaderSearch>
        <HeaderSearchInput type="text"></HeaderSearchInput>
        <HeaderSearchIconContainer>
          <SearchIcon />
        </HeaderSearchIconContainer>
      </HeaderSearch>

      <HeaderNavItems>
        <HeaderOption>
          <OptionLineOne>
            {!user ? "Hello" : "Hello " + user.name}
          </OptionLineOne>
          <OptionLineTwo onClick={signOut}>
            {!user ? "Sign In" : "Sign Out "}
          </OptionLineTwo>
        </HeaderOption>

        <HeaderOption>
          <OptionLineOne>Returns</OptionLineOne>
          <OptionLineTwo>& Orders</OptionLineTwo>
        </HeaderOption>

        <HeaderOptionCart>
          <Link to="/cart">
            <ShoppingBasketIcon />
            <CardCount>{getCountCart()}</CardCount>
          </Link>
        </HeaderOptionCart>
      </HeaderNavItems>
    </Container>
  );
};

const Container = styled.div`
  height: 60px;
  background-color: #131921;
  display: flex;
  align-items: center;
  color: white;
  justify-content: space-between;
`;
const HeaderLogo = styled.div`
  margin-left: 15px;
  padding: 4px 0 0 0;
  img {
    width: 100px;
    padding: 1px 8px 0 6px;
    margin: 1px;
  }
`;
const HeaderOptionAddress = styled.div`
  padding-left: 9px;
  display: flex;
  align-items: center;
`;
const HeaderOptionAddressText = styled.div``;
const OptionLineOne = styled.div`
  font-size: 12px;
`;
const OptionLineTwo = styled.div`
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
`;
const HeaderSearch = styled.div`
  display: flex;
  flex-grow: 1;
  height: 40px;
  border-radius: 4px;
  overflow: hidden;
  margin: 0 28px;

  :focus-within {
    box-shadow: 0 0 0 3px #f90;
  }
`;
const HeaderSearchInput = styled.input`
  flex-grow: 1;
  height: auto;
  top: 0;
  left: 0;
  margin: 0;
  padding-left: 6px;
  border: 0;
  width: 100%;
  line-height: 15px;
  height: 38px;
  font-size: 15px;
  color: #111;
  outline: 0;

  :focus {
    border: none;
  }
`;
const HeaderSearchIconContainer = styled.div`
  background-color: #febd69;
  width: 45px;
  height: auto;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
`;
const HeaderNavItems = styled.div`
  display: flex;
  justify-content: space-between;
`;
const HeaderOption = styled.div`
  margin-left: 6px;
  padding: 9px 10px;
`;
const HeaderOptionCart = styled.div`
  display: flex;
  align-items: center;
  margin-right: 9px;
  margin-left: 9px;
  a {
    display: flex;
    align-items: center;
    margin-left: 6px;
    margin-right: 6px;
    color: white;
    text-decoration: none;
  }
`;
const CardCount = styled.div`
  padding: 4px;
`;

export default Header;
