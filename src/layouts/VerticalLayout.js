// ** React Imports
import { Outlet } from "react-router-dom";
import React, { useContext } from "react";

// ** Core Layout Import
// !Do not remove the Layout import
import Layout from "@layouts/VerticalLayout";

// ** Menu Items Array
import navigation from "@src/navigation/vertical";
import UILoader from '@components/ui-loader'
import Spinner from '@components/spinner/Loading-spinner'
import {LoaderContext, LoaderProvider} from "../utility/context/LoaderContext";

const VerticalLayout = (props) => {
  // const [menuData, setMenuData] = useState([])

  // ** For ServerSide navigation
  // useEffect(() => {
  //   axios.get(URL).then(response => setMenuData(response.data))
  // }, [])

  const {loader_show, setLoaderShow} = useContext(LoaderProvider);
  return (
    
    <UILoader blocking={loader_show} loader={<Spinner />}>
      
    <Layout menuData={navigation} {...props}>
      <Outlet />
    </Layout>
    </UILoader>

  );
};

export default VerticalLayout;
