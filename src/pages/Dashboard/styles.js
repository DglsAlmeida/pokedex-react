import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  img {
    height: 80px;
  }
`;

export const Form = styled.form`
  margin-top: 60px;
  max-width: 700px;
  display: flex;

  input {
    width: 320px;
    height: 50px;
    border: 0;
    color: #3a3a3a;
    padding: 0 24px;
    border-radius: 5px 0 0 5px;

    &::placeholder {
      color: #a8a8b3;
    }
  }

  button {
    width: 100px;
    background: #436eee;
    border: 0;
    border-radius: 0px 5px 5px 0px;
    color: #ffff00;
    font-weight: bold;
    transition: background-color 0.3s;

    &:hover {
      background: ${shade(0.2, '#436EEE')};
    }
  }
`;

export const Error = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    margin-top: 20px;
    height: 150px;
  }

  span {
    font-size: 24px;
    color: #fff;
  }
`;

export const ContainerButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 30px;
`;

export const Button = styled.button`
  margin: 0 10px 10px 0;
  height: 40px;
  width: 100px;
  color: #fff;
  background-color: #3d3d3d;
  border-radius: 10px;
  border: 0;
  transition: background-color 0.3s;

  &:hover {
    background: ${shade(0.2, '#3d3d3d')};
  }
`;

export const PokemonsInformations = styled.div`
  margin-top: 80px;
  width: 100%;
  max-width: 700px;

  a {
    background-color: #3d3d3d;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    display: block;
    text-decoration: none;
    margin-bottom: 5px;

    display: flex;
    align-items: center;
    transition: background-color 0.3s;

    &:hover {
      background: ${shade(0.2, '#3d3d3d')};
    }

    img {
      width: 100px;
      height: 100px;
    }

    div {
      margin-left: 40px;

      strong {
        font-size: 35px;
        color: #fff;
      }

      p {
        font-size: 20px;
        color: #fff;
        margin-top: 4px;
      }
    }
  }

  a > a {
    margin-top: 10px;
  }
`;
