import styled from 'styled-components';



const StyledForm = styled.form`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 100%;
`
const StyledImgsContainer = styled.div`
display: flex;
align-items: center;
gap: 1rem;
overflow-x: scroll;
height: 100px;
`

const StyledTexboxInput = styled.textarea`
	height: 200px;
	width: 100%;
	resize: none;
`;
const StyledCrossIcon = styled.div`
position: absolute;
top: 0;
left: 0;
height: 20px;
width: 20px;
background-image: url('/images/cross.svg');
background-size: cover;
background-color: #fff;
cursor: pointer;
`
const StyledNewImg = styled.div`
position: relative;
height: 60px;
width: 60px;


`
export { StyledTexboxInput, StyledImgsContainer, StyledCrossIcon, StyledNewImg, StyledForm };
