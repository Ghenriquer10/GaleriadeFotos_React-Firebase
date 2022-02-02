import styled from "styled-components";

export const Container = styled.div`
    background-color: #27282F;
    color: #fff;
    min-height: 100vh;
    display: flex;
    justify-content:center;
    `;

export const Area = styled.div`
    max-width: 980px;
    padding: 30px;
`;

export const Header = styled.p`
    margin: 0;
    padding: 0;
    text-align: center;
    margin-bottom: 30px;
    color: grey;
    font-size: 2.4em;
`;

export const ScreenWarning = styled.div`
    text-align: center;

    .emoji{
        font-size: 50px;
        margin-bottom: 20px;
    }
`;

export const PhotoList = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
`

export const UploadForm = styled.form`
    background-color: #3D3F43;
    padding: 20px;
    margin-bottom: 10px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

        input[type="submit"]{
            padding: 7px;
            width: 100px;
            background-color: purple;
            color: white;
            border: none;
            cursor: pointer;
        }
        input[type="submit"]:hover{
            background-color: white;
            color: purple;
            transition: all 1s;
        }

        .uploading{
            margin-left:  -400px;
        }
`