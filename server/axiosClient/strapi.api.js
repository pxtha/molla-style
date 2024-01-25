import axiosClient from "./axios"


const AddToWishList = async (userDetail, wishListArray) => {
    wishListArray.map(async (item) => {
        const lastProductInWishListOfUser = await axiosClient.get(`/wishlists?populate=*&filters[user_id][id][$eq]=${userDetail.id}&filters[product][id]=${item}`)
        if (lastProductInWishListOfUser?.data?.data?.length === 0) {
            const params = {
                user_id: userDetail.id,
                product: item,
            }
            await axiosClient.post('/wishlists',{data:params})
        }
    })
}


const AddToCartList = async (userDetail, cartListArray) => {
    try {
        cartListArray.map(async (item) => {
            const lastProductInCarOfUser = await axiosClient.get(`/carts?populate=*&filters[user_id][id][$eq]=${userDetail.id}&filters[product][id]=${item.product}`)
            if (lastProductInCarOfUser?.data?.data?.length > 0) {
                const params = {
                    quantity: item.amount,
                }
                await axiosClient.put(`/carts/${lastProductInCarOfUser?.data?.data[0]?.id}`,{data:params})
            } else {
                const params = {
                    user_id: userDetail.id,
                    product: item.product,
                    quantity: item.amount,
                }
                await axiosClient.post('/carts',{data:params})
            }
        })
    } catch (e) {
        console.log(e)
    }

}

const RemoveWishList =  async (id,userid) => {
    const findWishList = await axiosClient.get(`/wishlists?populate=*&filters[user_id][id][$eq]=${userid}&filters[product][id]=${id}`).then(
        (response) => {
            if (response?.data?.length > 0) {
                axiosClient.delete('/wishlists/' + response?.data?.data[0]?.id)
            }
        }
    )
}

const RemoveCart =  async (id,userid) => {
    await axiosClient.get(`/carts?populate=*&filters[user_id][id][$eq]=${userid}&filters[product][id]=${id}`).then(
        (response) => {
            if (response?.data?.data?.length > 0) {
                axiosClient.delete('/carts/' + response?.data?.data[0]?.id)
            }
        })
}


const GetUserWishList =  async (id) => {
    const response = await axiosClient.get('/wishlists?populate[product][populate][0]=product_variants&populate[product][populate][1]=images&filters[user_id][id][$eq]=' + id)
    const wishlist = []
    if (response) {
        response?.data.map((item) => (
            wishlist.push(item?.attributes?.product?.data)
        ))
    }
    return wishlist
}   


const GetUserCart =  async (id) => {
    const response = await axiosClient.get('/carts?populate[product][populate]=*&populate[size]=*&populate[product_variant]=*&filters[user_id][id][$eq]=' + id)
    if (response) {
        return response?.data
    }
}

const GetUserDetail =  async () => {
    const response = await axiosClient.get('/users/me')
    return (response?.data ? response?.data : null)
}

const Checkout = async (cartListArray) => {
    const response = await axiosClient.post('/orders',{
        products: cartListArray
    })
    return (response?.data ? response?.data : null)
}

export { RemoveWishList, RemoveCart, GetUserWishList,GetUserCart,AddToCartList,AddToWishList,GetUserDetail,Checkout }