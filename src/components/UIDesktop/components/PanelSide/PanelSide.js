import ButtonToggle from './components/ButtonToggle'
import Logo from './components/Logo'

const PanelSide = props => (
  <Wrapper isActive={props.isActive}>
    <Logo />
    <ButtonToggle onClick={props.onClickButtonToggle} />
  </Wrapper>
)

const Wrapper = styled.div`
  backdrop-filter: blur(2px);
  background-color: rgba(0, 0, 0, 0.65);
  height: 100vh;
  left: ${props => props.isActive ? 0 : '-30rem'};
  position: fixed;
  top: 0;
  transition: 0.25s left;
  width: 30rem;
`

export default PanelSide
