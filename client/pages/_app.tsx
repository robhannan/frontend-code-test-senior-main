import type { AppProps } from 'next/app'
import "../styles/globals.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createTheme, ThemeProvider } from '@mui/material';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#f050f8',
      contrastText: "#100030"
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          "&.Mui-disabled": {
            background: "#600e6b",
            color: "#fff"
          }
        }
      }
    }
  }
});

function MyApp({ Component, pageProps }: AppProps) {
  
  return <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  </ApolloProvider>
}

export default MyApp;
