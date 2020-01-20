const GlobalStyles = () => (
  <style jsx global>
    {`
      *, *:before, *:after {
        box-sizing: inherit;
      }

      * {
        background: none;
        border: none;
        font-size: 1rem;
        margin: 0;
        outline: none;
        padding: 0;
        user-select: none;
      }

      html {
        box-sizing: border-box;
        overflow: hidden;
      }

      ::selection {
        background: none;
      }
    `}
  </style>
)

export default GlobalStyles
