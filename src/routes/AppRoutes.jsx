import {BrowserRouter,Routes,Route} from "react-router-dom";
import Layout from "../components/Layout";
import Dashboard from "../pages/Dashboard";
import AddExpense from "../pages/AddExpense";
import Transactions from "../pages/Transactions";
import Analytics from "../pages/Analytics";


const AppRoutes=()=>{
return(
<BrowserRouter>
<Layout>
<Routes>
<Route path="/" element={<Dashboard/>}/>
<Route path="/add" element={<AddExpense/>}/>
<Route path="/transactions" element={<Transactions/>}/>
<Route path="/analytics" element={<Analytics/>}/>
</Routes>
</Layout>

</BrowserRouter>
);
};

export default AppRoutes;