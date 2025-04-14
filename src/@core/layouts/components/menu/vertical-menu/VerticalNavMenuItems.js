// ** Vertical Menu Components
import VerticalNavMenuLink from "./VerticalNavMenuLink";
import VerticalNavMenuGroup from "./VerticalNavMenuGroup";
import VerticalNavMenuLink_Group from "./VerticalNavMenuLink_Group";
import VerticalNavMenuSectionHeader from "./VerticalNavMenuSectionHeader";

// ** Utils
import { resolveVerticalNavMenuItemComponent as resolveNavItemComponent } from "@layouts/utils";

const VerticalMenuNavItems = (props) => {
  // ** Components Object
  const Components = {
    VerticalNavMenuLink,
    VerticalNavMenuGroup,
    VerticalNavMenuSectionHeader,
    VerticalNavMenuLink_Group,
  };

  // ** Render Nav Menu Items
  const RenderNavItems = props.items.map((item, index) => {
    const TagName = Components[resolveNavItemComponent(item)];
    if (item.children) {
      return (
        canViewMenuGroup(item) && (
          <TagName item={item} index={index} key={item.id} {...props} />
        )
      );
    }
    return <TagName key={item.id || item.header} item={item} {...props} />;
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

  //     const TagName = Components["VerticalNavMenuLink_Group"];
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

  return RenderNavItems;
};

export default VerticalMenuNavItems;
