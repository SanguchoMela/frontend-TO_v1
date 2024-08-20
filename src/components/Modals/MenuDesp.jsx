import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";

const MenuDesp = ({ title, items = [] }) => {
  return (
    <Menu as="div" className="inline-block w-full">
      {({ open }) => (
        <>
          <div>
            <MenuButton className="inline-flex justify-center font-medium">
              {title}
              {open ? (
                <ChevronDownIcon aria-hidden="true" className="-mr-1 h-6 w-6" />
              ) : (
                <ChevronUpIcon aria-hidden="true" className="-mr-1 h-6 w-6" />
              )}
            </MenuButton>
          </div>

          <MenuItems transition className="text-blanco bg-turquesa-fuerte mt-2">
            <div className="py-1">
              {items.map((item, index) => (
                <MenuItem key={index}>
                  <a href={item.slug} className="block py-3">
                    {item.anchor}
                  </a>
                </MenuItem>
              ))}
            </div>
          </MenuItems>
        </>
      )}
    </Menu>
  );
};

export default MenuDesp;
