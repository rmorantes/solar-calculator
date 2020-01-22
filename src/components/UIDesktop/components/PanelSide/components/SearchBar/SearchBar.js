// TODO: Add search button. ~ RM
// TODO: Add clear button. ~ RM
const SearchBar = props => (
  <Wrapper onSubmit={props.onSubmit}>
    <InputField
      type="text"
      onChange={props.onChange}
      placeholder='Search US addresses'
      value={props.value}
    />
  </Wrapper>
)

const Wrapper = styled.form`
  align-items: center;
  display: flex;
  flex: 1;
  margin-left: 2rem;
  margin-right: 2rem;
  margin-top: 2rem;
`

const InputField = styled.input`
  box-sizing: content-box;
  background-color: #D2D2D2;
  border-radius: 0.75rem;
  display: flex;
  flex: 1;
  height: 1rem;
  line-height: 1.75rem;
  padding: 0.75rem;
  ::placeholder {
    color: grey;
  }
`

export default SearchBar
