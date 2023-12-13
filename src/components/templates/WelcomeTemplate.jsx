import styled from "styled-components";

import { v } from "../../styles/variables";
import { BtnSave } from "../moleculas/BtnSave";
import { Carousel } from "../moleculas/Carousel";
import { useAuthStore } from "../../store/AuthStore";
import { Device } from "../../styles/breakpoints";


export function WelcomeTemplate() {

  const { signOut } = useAuthStore();

  return (
    <Main>
      <Container>
        <Box>
          <Carousel />
        </Box>
        <Title>
          Bienvenido a Cerdyn <br /> 🐷
        </Title>
        <SubText>
          Cerdyn nace por las pocas aplicaciones gratis que existen para
          controlar gastos e ingresos.
          <br />
          ❤️Está surgiendo como curso para lograr presupuestarlo,
          <br /> MUCHAS GRACIAS POR APOYAR ESTE PROYECTO
        </SubText>
        <ContainerAutor>

          <button onClick={signOut}>Cerra sesion </button>


        </ContainerAutor>
        <ButtonContainer>
          <BtnSave url="https://t.me/htmlycss369"
            title="UNIRSE A Telegram"
            bgColor="#BF94FF"
            icon={<v.iconoreact />}
          />
          <BtnSave url="https://www.udemy.com/course/sistema-para-el-control-de-gastos-con-reactjs-y-postgresql/?couponCode=CERDYNREACT"
            title="Ver curso"
            bgColor="#fb37b7"
            icon={<v.iconocorona />}
          />
        </ButtonContainer>
      </Container>
    </Main>
  );
}
const Main = styled.main`
  min-height: 100vh;
  width: 100%;
  background-color: ${(props) => props.theme.bgtotal};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  
`;
const Container = styled.div`
  width: 75%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align:center;
  
`;
const Box = styled.div`
  width: 50%;
  height: 100%;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 40em) {
    min-height: 50vh;
  }
`;
const Title = styled.h2`
  font-size: ${(props) => props.theme.fontxxl};
  text-transform: capitalize;
  color: ${(props) => props.theme.text};
  align-self: flex-start;
  width: 80%;
  margin: 0 auto;

  @media (max-width: 64em) {
    width: 100%;
    text-align: center;
  }
  @media (max-width: 40em) {
    font-size: ${(props) => props.theme.fontxl};
  }
  @media (max-width: 30em) {
    font-size: ${(props) => props.theme.fontlg};
  }
`;
const SubText = styled.p`
  font-size: ${(props) => props.theme.fontlg};
  color: #8e8c86;
  align-self: flex-start;
  width: 80%;
  margin: 1rem auto;
  font-weight: 400;

  @media (max-width: 64em) {
    width: 100%;
    text-align: center;
    font-size: ${(props) => props.theme.fontmd};
  }
  @media (max-width: 40em) {
    font-size: ${(props) => props.theme.fontmd};
  }
  @media (max-width: 30em) {
    font-size: ${(props) => props.theme.fontsm};
  }
`;
const ContainerAutor = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  .contentImg {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      object-fit: contain;
    }
  }
  .contentDescripcion {
    display: flex;
    flex-direction: column;
    b{
      color: ${(props) => props.theme.text};
    }
    span {
      color: #8c8c8c;
    }
  }
`;
const ButtonContainer = styled.div`
  width: 80%;
  margin: 1rem auto;
  align-self: center;
  justify-content:center;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 64em) {
    width: 100%;
  }
  @media ${() => Device.tablet} {
        flex-direction: row;
    }
`;