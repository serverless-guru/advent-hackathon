import { BrowserRouter } from 'react-router-dom';
import './App.css'
import Chat from "./components/molecules/chat/Chat.tsx";
import { AppRoutes } from './utils/navigation/Routes.tsx';

function App() {
    return (
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    );
}

export default App