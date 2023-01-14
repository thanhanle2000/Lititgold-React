import axios from "axios";
import { atom, selector } from "recoil";
import { Booking, Cart, Location, Restaurant, TabType } from "./models";
import { calcCrowFliesDistance } from "./utils/location";
import sdk from "./utils/sdk";
import { URL, home_url, product_url, search_url, cart_url } from "./utils/constants";
export const loginState = selector({
  key: "login",
  get: () => sdk.login(),
});

// lấy thông tin app
export const userInfoState = selector({
  key: "userinfo",
  get: async () => {
    const { data } = await axios.get(URL + home_url + "/GetInfoApp?websiteId=14", {});
    return data;
  }
})
// lấy danh mục tiêu biểu
export const cateRepresentative = selector({
  key: 'cateRepresentative',
  get: async () => {
    const { data } = await axios.get(URL + home_url + "/GetDataCateSpecial?websiteId=14", {});
    return data;
  }
})
// lấy banner app
export const bannerApp = selector({
  key: 'bannerApp',
  get: async () => {
    const { data } = await axios.get(URL + home_url + "/GetDataBanner?websiteId=14", {});
    return data;
  }
})
// lấy danh sách sản phẩm trang home
export const getDataProductHome = selector({
  key: 'getDataProductHome',
  get: async ({ get }) => {
    const { data } = await axios.get(URL + home_url + "/GetDataProduct?websiteId=14", {});
    return data;
  }
})
// lấy danh sách sản phẩm
export const getDataProduct = selector({
  key: 'dataProduct',
  get: async () => {
    const { data } = await axios.post(URL + product_url + "/GetDataProductFollowCategory", {
      "websiteId": "14",
      "where": "1=1  and  Product.websiteId= 14 and  Product.active=1"
      , "categoryId": "63"
      , "pageSize": 20
      , "pageIndex": 1
      , "sort": "Product.isBestSeller asc"
    });
    return data;
  }
})

// sản phẩm đánh giá nhiều nhất
export const getDataRatingProduct = selector({
  key: 'getDataRatingProduct',
  get: async ({ get }) => {
    const param = {
      "where": "1=1  and  Product.websiteId= 14 and  Product.active=1"
      , "sort": "Product.numberRate asc"
      , "pageSize": 20
      , "pageIndex": 0
    };
    const { data } = await axios.post(URL + product_url + "/GetDataProduct", param);
    return data;
  }
})
// sản phẩm được mua nhiều nhất
export const getDataBestSaleProduct = selector({
  key: 'getDataBestSaleProduct',
  get: async ({ get }) => {
    const param = {
      "where": "1=1  and  Product.websiteId= 14 and  Product.active=1"
      , "sort": "Product.isBestSeller asc"
      , "pageSize": 20
      , "pageIndex": 0
    };
    const { data } = await axios.post(URL + product_url + "/GetDataProduct", param);
    return data;
  }
})
// get id sản phẩm
export const idProduct = atom({
  key: 'listTodo',
  default: 0,
});

// sử lí id -> chi tiết sản phẩm
export const dataDetailProduct = selector({
  key: 'idProducts',
  get: async ({ get }) => {
    const { data } = await axios.get(URL + product_url + "/GetDataProductDetail?websiteId=14&productId=" + get(idProduct), {});
    return data;
  },
});

// lấy danh sách hình ảnh con của sản phẩm
export const getImageChildren = selector({
  key: 'imageChildren',
  get: async ({ get }) => {
    const todoList = get(idProduct);
    const { data } = await axios.get(URL + product_url + "/GetDataProductDetailAlbums?websiteId=14&productId=" + todoList, {});
    return data;
  }
})
// get images
export const images = atom({
  key: 'images',
  default: ''
})

// return images
export const getImages = selector({
  key: 'getImages',
  get: ({ get }) => {
    const data = get(images);
    return data;
  }
})
export const userState = selector({
  key: "user",
  get: async ({ get }) => {
    await get(loginState);
    const { userInfo } = await sdk.getUserInfo({});
    return userInfo;
  },
});

// lấy danh mục sản phẩm
export const getDataCateProduct = selector({
  key: 'getDataCateProduct',
  get: async ({ get }) => {
    const { data } = await axios.get(URL + "/api/categorymobile/GetDataCtaegory?websiteId=14", {});
    return data;
  }
})
// get id danh mục sản phẩm
export const idCate = atom({
  key: 'idCate',
  default: 0,
});

// lấy giá trị theo bộ lọc
export const idSort = atom({
  key: 'sort',
  default: " Product.id desc"
})

// lấy danh sách sản phẩm theo danh mục
export const dataCateProduct = selector({
  key: 'dataCateProduct',
  get: async ({ get }) => {
    const { data } = await axios.post(URL + product_url + "/GetDataProductFollowCategory", {
      "websiteId": "14", "where": "1=1  and  Product.websiteId= 14 and  Product.active=1"
      , "categoryId": get(idCate)
      , "pageSize": 20
      , "pageIndex": 1
      , "sort": get(idSort ?? "Product.id desc")
    });
    return data;
  }
})

// lấy danh sách top tìm kiếm
export const topKeySearch = selector({
  key: 'topKeySearch',
  get: async ({ get }) => {
    const { data } = await axios.get(URL + search_url + '/GetTopKeyWords?websiteId=14', {});
    return data;
  }
})
// lấy key search
export const idKey = atom({
  key: 'idKey',
  default: ""
})
// lấy từ khóa 
export const getKey = selector({
  key: 'getKey',
  get: ({ get }) => {
    var key = get(idKey);
    return key;
  }
})
// lấy dữ liệu theo từ khóa
export const getDataGetKey = selector({
  key: 'getDataGetKey',
  get: async ({ get }) => {
    const { data } = await axios.post(URL + product_url + "/GetDataProduct", {
      "websiteId": "14"
      , "where": "1=1 and  Product.websiteId=14 and Product.name COLLATE Latin1_General_CI_AI LIKE N'%" + get(idKey) + "%'"
      , "sort": "Product.id desc"
      , "pageSize": 20
      , "pageIndex": 0
    });
    return data;
  }
})

// lấy dữ liệu cho tất cả sản phẩm
export const getTabAll = selector({
  key: 'getTabAll',
  get: async ({ get }) => {
    const param = {
      "where": "1=1  and  Product.websiteId= 14 and  Product.active=1"
      , "sort": get(idSort ?? "Product.id desc")
      , "pageSize": 20
      , "pageIndex": 0
    };
    const { data } = await axios.post(URL + product_url + "/GetDataProduct", param);
    return data;
  }
})

// lấy dữ liệu cho sản phẩm hot
export const getTabHot = selector({
  key: 'getTabHot',
  get: async ({ get }) => {
    const param = {
      "where": "1=1  and  Product.websiteId= 14 and  Product.active=1  and Product.isNew=1"
      , "sort": get(idSort ?? "Product.id desc")
      , "pageSize": 20
      , "pageIndex": 0
    };
    const { data } = await axios.post(URL + product_url + "/GetDataProduct", param);
    return data;
  }
})

// lấy dữ liệu cho sản phẩm bán chạy nhất
export const getTabSale = selector({
  key: 'getTabSale',
  get: async ({ get }) => {
    const param = {
      "where": "1=1  and  Product.websiteId= 14 and  Product.active=1  and Product.isSpecial=1"
      , "sort": get(idSort ?? "Product.id desc")
      , "pageSize": 20
      , "pageIndex": 0
    };
    const { data } = await axios.post(URL + product_url + "/GetDataProduct", param);
    return data;
  }
})
// lấy dữ liệu cho sản phẩm mới nhất
export const getTabNew = selector({
  key: 'getTabNew',
  get: async ({ get }) => {
    const param = {
      "where": "1=1  and  Product.websiteId= 14 and  Product.active=1  and Product.isNew=1"
      , "sort": get(idSort ?? "Product.id desc")
      , "pageSize": 20
      , "pageIndex": 0
    };
    const { data } = await axios.post(URL + product_url + "/GetDataProduct", param);
    return data;
  }
})

// lấy id thuộc tính sản phẩm
export const getIDPro = atom({
  key: 'getIDPro',
  default: 0
})

// lấy dữ liệu thuộc tính
export const getProperties = selector({
  key: "getProperties",
  get: async ({ get }) => {
    const { data } = await axios.get(URL + product_url + "/GetDataProductProperties?productId=" + get(getIDPro), {});
    return data;
  }
})

// lấy dữ liệu cho giỏ hàng
export const getDataCart = selector({
  key: 'getDataCart',
  get: async ({ get }) => {
    const param = {
      "voucherCode": "",
      "provId": 0,
      "cityId": 0,
      "areaId": 0,
      "lstProds": JSON.parse(localStorage.getItem('cart') || "[]")
    }
    const { data } = await axios.post(URL + cart_url + "/GetDataShopCarts?domainName=litigold.vn", param);
    return data;
  }
})

// lấy tỉnh /thành
export const getTinh = selector({
  key: "getTinh",
  get: async ({ get }) => {
    const { data } = await axios.get(URL + "/api/AddressMobile/GetDataAddress?type=1&idSelect=0");
    return data;
  }
})

// lấy id quận/huyện
export const idHuyen = atom({
  key: "idHuyen",
  default: 0,
})

// lấy dữ liệu cho quận /huyện
export const getHuyen = selector({
  key: "getHuyen",
  get: async ({ get }) => {
    const { data } = await axios.get(URL + "/api/AddressMobile/GetDataAddress?type=2&idSelect=" + get(idHuyen));
    return data;
  }
})
// lấy id phường /xã
export const idXa = atom({
  key: "idXa",
  default: 0,
})

// lấy dữ liệu cho phường /xã
export const getXa = selector({
  key: "getXa",
  get: async ({ get }) => {
    const { data } = await axios.get(URL + "/api/AddressMobile/GetDataAddress?type=3&idSelect=" + get(idXa));
    return data;
  }
})


export const retryLocationState = atom({
  key: "retryLocation",
  default: 0,
});

export const positionState = selector<Location | undefined>({
  key: "position",
  get: async ({ get }) => {
    try {
      const allow = get(retryLocationState);
      if (allow) {
        await get(loginState);
        const { latitude, longitude } = await sdk.getLocation({});
        return {
          lat: Number(latitude),
          long: Number(longitude),
        };
      }
    } catch (error) {
      return undefined;
    }
    return undefined;
  },
});

export const restaurantsState = selector<Restaurant[]>({
  key: "restaurants",
  get: () => [
    {
      id: 1,
      name: "Chi nhánh - Lê Thánh Tôn",
      districtId: 1,
      rating: 4.5,
      location: {
        lat: 10.776463610730223,
        long: 106.70098038648123,
      },
      address: "15A Lê Thánh Tôn, Quận 1, Hồ Chí Minh",
      views: 100,
      image:
        "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
      hours: {
        opening: [9, 0, "AM"],
        closing: [22, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "0123 456 789",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.394868527438!2d106.70554879999999!3d10.781038700000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f492daac79b%3A0x16e334e4778de0c1!2zMTVhIEzDqiBUaMOhbmggVMO0biwgQuG6v24gTmdow6ksIFF14bqtbiAxLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmg!5e0!3m2!1svi!2s!4v1655781904560!5m2!1svi!2s",
    },
    {
      id: 2,
      name: "Chi nhánh - Trần Hưng Đạo",
      address: "15A Trần Hưng Đạo, Đa Kao, Quận 1, Hồ Chí Minh",
      districtId: 1,
      rating: 4.5,
      location: {
        lat: 10.755009040272618,
        long: 106.67897941334107,
      },
      views: 50,
      image:
        "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      hours: {
        opening: [9, 0, "AM"],
        closing: [22, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "0123 456 789",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.585876004013!2d106.69000821538795!3d10.766364992328358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1640b88ca3%3A0x8d9f87825b5b807!2zMTIxLzE1IMSQLiBUcuG6p24gSMawbmcgxJDhuqFvLCBQaMaw4budbmcgUGjhuqFtIE5nxakgTMOjbywgUXXhuq1uIDEsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1655782080310!5m2!1svi!2s",
    },
  ],
});

export const categoriesState = selector({
  key: "categories",
  get: () => ["Pizza", "Pasta", "Salad", "Sandwich", "Drink"],
});

export const menuState = selector({
  key: "menu",
  get: ({ get }) => {
    const categories = get(categoriesState);
    const foods = get(foodsState);
    return {
      categories: categories.map((category, index) => ({
        id: String(index),
        name: category,
        foods: foods.filter((food) => food.categories.includes(category)),
      })),
    };
  },
});

export const foodsState = selector({
  key: "foods",
  get: () => [
    {
      id: 1,
      name: "Daily Pizza",
      price: 400000,
      image:
        "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      categories: ["Pizza", "Pasta", "Salad", "Sandwich", "Drink"],
      description: `Pizza Hải Sản Xốt Pesto Với Hải Sản (Tôm, Mực) Nhân Đôi Cùng Với Nấm Trên Nền Xốt Pesto Đặc Trưng, Phủ Phô Mai Mozzarella Từ New Zealand Và Quế Tây.`,
      options: [
        {
          key: "cheese",
          label: "Thêm phô mai",
          selected: true,
        },
        {
          key: "no-onion",
          label: "Không hành",
          selected: false,
        },
        {
          key: "seafood",
          label: "Thêm hải sản",
          selected: false,
        },
      ],
      extras: [
        {
          key: "size",
          label: "Size (Khẩu phần)",
          options: [
            {
              key: "small",
              label: "Nhỏ",
            },
            {
              key: "medium",
              label: "Vừa",
              selected: true,
            },
            {
              key: "large",
              label: "To",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Prosciutto",
      price: 400000,
      image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      categories: ["Pizza"],
      description: `Pizza Hải Sản Xốt Pesto Với Hải Sản (Tôm, Mực) Nhân Đôi Cùng Với Nấm Trên Nền Xốt Pesto Đặc Trưng, Phủ Phô Mai Mozzarella Từ New Zealand Và Quế Tây.`,
      options: [
        {
          key: "cheese",
          label: "Thêm phô mai",
          selected: true,
        },
        {
          key: "no-onion",
          label: "Không hành",
          selected: false,
        },
        {
          key: "seafood",
          label: "Thêm hải sản",
          selected: false,
        },
      ],
      extras: [
        {
          key: "size",
          label: "Size (Khẩu phần)",
          options: [
            {
              key: "small",
              label: "Nhỏ",
            },
            {
              key: "medium",
              label: "Vừa",
              selected: true,
            },
            {
              key: "large",
              label: "To",
            },
          ],
        },
      ],
    },
    {
      id: 3,
      name: "Prosciutto",
      price: 400000,
      image:
        "https://images.unsplash.com/photo-1558030006-450675393462?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80",
      categories: ["Pizza", "Drink"],
      description: `Pizza Hải Sản Xốt Pesto Với Hải Sản (Tôm, Mực) Nhân Đôi Cùng Với Nấm Trên Nền Xốt Pesto Đặc Trưng, Phủ Phô Mai Mozzarella Từ New Zealand Và Quế Tây.`,
      options: [
        {
          key: "cheese",
          label: "Thêm phô mai",
          selected: true,
        },
        {
          key: "no-onion",
          label: "Không hành",
          selected: false,
        },
        {
          key: "seafood",
          label: "Thêm hải sản",
          selected: false,
        },
      ],
      extras: [
        {
          key: "size",
          label: "Size (Khẩu phần)",
          options: [
            {
              key: "small",
              label: "Nhỏ",
            },
            {
              key: "medium",
              label: "Vừa",
              selected: true,
            },
            {
              key: "large",
              label: "To",
            },
          ],
        },
      ],
    },
    {
      id: 4,
      name: "Daily Pizza",
      price: 400000,
      image:
        "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80",
      categories: ["Pizza", "Drink"],
      description: `Pizza Hải Sản Xốt Pesto Với Hải Sản (Tôm, Mực) Nhân Đôi Cùng Với Nấm Trên Nền Xốt Pesto Đặc Trưng, Phủ Phô Mai Mozzarella Từ New Zealand Và Quế Tây.`,
      options: [
        {
          key: "cheese",
          label: "Thêm phô mai",
          selected: true,
        },
        {
          key: "no-onion",
          label: "Không hành",
          selected: false,
        },
        {
          key: "seafood",
          label: "Thêm hải sản",
          selected: false,
        },
      ],
      extras: [
        {
          key: "size",
          label: "Size (Khẩu phần)",
          options: [
            {
              key: "small",
              label: "Nhỏ",
            },
            {
              key: "medium",
              label: "Vừa",
            },
            {
              key: "large",
              label: "To",
            },
          ],
        },
      ],
    },
  ],
});

export const keywordState = atom({
  key: "keyword",
  default: "",
});

export const districtsState = selector({
  key: "districts",
  get: () => [
    {
      id: 1,
      name: "Quận 1",
    },
    {
      id: 5,
      name: "Quận 5",
    },
    {
      id: 7,
      name: "Quận 7",
    },
    {
      id: 13,
      name: "Thủ Đức",
    },
  ],
});

export const selectedDistrictState = atom({
  key: "selectedDistrict",
  default: 1,
});

export const popularRestaurantsState = selector<Restaurant[]>({
  key: "popularRestaurants",
  get({ get }) {
    const restaurants = get(restaurantsState);
    const keyword = get(keywordState);
    const selectedDistrict = get(selectedDistrictState);
    return restaurants
      .filter((restaurant) =>
        restaurant.name.toLowerCase().includes(keyword.toLowerCase())
      )
      .filter(
        (restaurant) =>
          selectedDistrict === 0 || restaurant.districtId === selectedDistrict
      )
      .filter((restaurant) => restaurant.views >= 50);
  },
});

export const nearestRestaurantsState = selector<Restaurant[]>({
  key: "nearestRestaurants",
  get({ get }) {
    const restaurants = get(restaurantsState);
    const position = get(positionState);
    if (position) {
      return [...restaurants].sort((a, b) => {
        const aDistance = calcCrowFliesDistance(position, a.location);
        const bDistance = calcCrowFliesDistance(position, b.location);
        return aDistance - bDistance;
      });
    }
    return restaurants;
  },
});

export const currentRestaurantTabState = atom<TabType>({
  key: "currentRestaurantTab",
  default: "info",
});

export const cartState = atom<Cart>({
  key: "cart",
  default: {
    items: [],
  },
});

export const totalState = selector({
  key: "total",
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.items.reduce(
      (total, item) => total + item.quantity * item.food.price,
      0
    );
  },
});

export const bookingsState = atom<Booking[]>({
  key: "bookings",
  default: [],
  effects: [
    ({ setSelf, getPromise }) => {
      // generate a demo booking item, can be safely deleted if you don't need it
      Promise.all([getPromise(restaurantsState), getPromise(foodsState)]).then(
        ([restaurants, foods]) => {
          setSelf((bookings) => [
            ...(Array.isArray(bookings) ? bookings : []),
            {
              id: "1234567890",
              restaurant: restaurants[0],
              cart: {
                items: [
                  {
                    quantity: 1,
                    food: foods[0],
                    note: "",
                  },
                  {
                    quantity: 2,
                    food: foods[1],
                    note: "Kèm ớt trái",
                  },
                ],
              },
              bookingInfo: {
                date: new Date(),
                hour: [20, 0, "PM"],
                table: "05",
                seats: 4,
              },
            },
          ]);
        }
      );
    },
  ],
});
