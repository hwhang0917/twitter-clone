import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    /* Reset Margins */
    *, *::before, *::after {
        margin: 0;
    };

    /* Import Font */
    @font-face {
        font-family: Nato Sans KR;
        src: url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;700&display=swap');
    }

    /* Global body style */
    body {
        font-family: "Noto Sans KR", sans-serif;
        color: #ecf0f1;
        background: #2c3e50;
        padding: 15px;
    }
`;

export default GlobalStyle;
