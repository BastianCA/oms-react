import { useEffect, useState } from "react";
import type { MenuModel } from "../types/types";
import AppSubMenu from "./AppSubMenu";
import { Menu } from "./menu-data/menu-data";

const AppMenu = () => {
  const [model, setModel] = useState<MenuModel[]>([]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData") ?? "{}");

    const userPermissions = userData.permissionUserLoginDTOS?.flatMap((permissionGroup: any) => permissionGroup.idOpcion);

    const filterItems = (items: MenuModel[]): MenuModel[] => {
      return items.reduce((acc: MenuModel[], item: any) => {
        if (item.items) {
          const filteredSubItems = filterItems(item.items);
          if (filteredSubItems.length > 0) {
            acc.push({ ...item, items: filteredSubItems });
          }
        } else if (userPermissions?.includes(item?.idPermission)) {
          acc.push(item);
        }
        return acc;
      }, []);
    };

    const filteredMenu = filterItems(Menu.MenuData);

    setModel(filteredMenu);
  }, []);

  return <AppSubMenu model={model} />;
};

export default AppMenu;
