import HomePage from "./pages/Home"
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './utils/router/privateRoute';
import AuthRootPage from './pages/auth';
import { ColorModeContext, useMode } from './theme';
import { ThemeProvider, CssBaseline } from '@mui/material';
import LayoutComponent from './components/layout';
import WatchlistPage from './pages/watchlist';
import SettingsPage from './pages/settings';
import ServicePage from "./pages/service";
import AdminPanelPage from "./pages/admin";
import SingleAssetPage from "pages/single-asset";
import CompanyPage from "pages/compony";


function App() {
  const [theme, colorMode] = useMode()
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <div className='App'>
          <Routes>
            <Route element={<LayoutComponent/>}>
            <Route element={<PrivateRoute/>}>
              <Route path='/' element={<HomePage/>}/>
              <Route path='/service' element={<ServicePage/>}/>
              <Route path='/watchlist' element={<WatchlistPage/>}/>
              <Route path='/about' element={<CompanyPage/>}/>
              <Route path='/admin' element={<AdminPanelPage/>}/>
              <Route path='/settings' element={<SettingsPage/>}/>
              <Route path='/single/:id' element={<SingleAssetPage/>}/>
            </Route>
            <Route path='login' element={<AuthRootPage/>}/>
            <Route path='register' element={<AuthRootPage/>}/>
            </Route>
          </Routes>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App;
