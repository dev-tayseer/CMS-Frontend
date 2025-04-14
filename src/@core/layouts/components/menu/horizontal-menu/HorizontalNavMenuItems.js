// ** Menu Components Imports
import HorizontalNavMenuLink from "./HorizontalNavMenuLink";
import HorizontalNavMenuLink_Group from "./HorizontalNavMenuLink_Group";

import HorizontalNavMenuGroup from "./HorizontalNavMenuGroup";
import { resolveHorizontalNavMenuItemComponent as resolveNavItemComponent } from "@layouts/utils";

const HorizontalNavMenuItems = (props) => {
  // ** Components Object
  const Components = {
    HorizontalNavMenuGroup,
    HorizontalNavMenuLink,
    HorizontalNavMenuLink_Group,
  };


  // ** Render Nav Items
  const RenderNavItems = props.items.map((item, index) => {
    const TagName = Components[resolveNavItemComponent(item)];

    if (item.children) {
      return (
        canViewMenuGroup(item) && (
          <TagName item={item} index={index} key={item.id} {...props} />
        )
      );
    }
    if (item.id =="cities"||item.id =="countries"||item.id =="nationalities"){
      return ''
    }else{
      return <TagName item={item} index={index} key={item.id} {...props} />;

    }
  });

  // const RenderNavItems = [
  //   ...props.items.map((item, index) => {
  //     const TagName = Components[resolveNavItemComponent(item)];

  //     if (item.children) {
  //       return (
  //         canViewMenuGroup(item) && (
  //           <TagName item={item} index={index} key={item.id} {...props} />
  //         )
  //       );
  //     }

  //     // Skip rendering certain items based on id
  //     if (item.id === "cities" || item.id === "countries" || item.id === "nationalities") {
  //     } else {
  //       return <TagName item={item} index={index} key={item.id} {...props} />;
  //     }
  //   }),

  //   (() => {

  //     const TagName = Components["HorizontalNavMenuLink_Group"];
  //     return (
  //       <>
  //         <TagName item={[{ id: 'cities', title: 'المدن', navLink: '/cities', group:"settings" },
  //         { id: 'countries', title: 'الدول', navLink: '/countries' , group:"settings"},
  //         { id: 'nationalities', title: 'الجنسيات', navLink: '/nationalities', group:"settings" }
  //         ]}
  //         titlex = {'الاعدادات'}
  //         img = {''}
  //         />
          
  //       </>
  //     );
  //   })(),







  // ];

  console.log(RenderNavItems, "RenderNavItems")

  return RenderNavItems;
};

export default HorizontalNavMenuItems;
