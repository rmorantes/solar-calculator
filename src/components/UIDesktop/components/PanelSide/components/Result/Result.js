import { useStateValue } from 'src/services/context'
import panThenZoomMap from 'src/components/UIDesktop/services/panThenZoomMap'

// TODO: Mouseover of result highlights associated map icon. ~ RM
const Result = props => {
  const [{ map }] = useStateValue()
  const onClick = () => panThenZoomMap(map, props.coordinates)

  return (
    <Wrapper onClick={onClick}>
      <IconSearch className='fas fa-search' />
      <PlaceName> {props.placeName} </PlaceName>
      <IconChevron className='fas fa-chevron-right' />
    </Wrapper>
  )
}

const Wrapper = styled.button`
  background-color: #D2D2D2;
  border-radius: 0.75rem;
  display: flex;
  margin-left: 2rem;
  margin-right: 2rem;
  margin-top: 2rem;
  padding: 0.75rem;
  transition: 0.25s background-color;
  width: calc(100% - 4rem);
  &:hover {
    background-color: white;
    box-shadow: 0 0 0.5rem orange;
  }
`

const Icon = css`
  color: orange;
  font-size: 1.5rem;
  text-shadow: 0 0 0.1rem black;
`

const IconSearch = styled.i`
  ${Icon}
  margin-right: 1.5rem;
  padding-left: 0.1rem;
  padding-right: 0.1rem;
`

const PlaceName = styled.p`
  line-height: 1.5rem;
  max-width: 18.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const IconChevron = styled.i`
  ${Icon}
  margin-left: auto;
`

export default Result
