const ProductReducer = (state, action) => {
    switch (action.type) {
        case "GET_PRODUCTS":
            return {
                ...state,
                products: action.payload,
            };
        case "ADD_CART":
            return {
                ...state,
                cart:[...state.cart, action.payload],
            };
            case "CLEAR_CART":
                return {
                    ...state,
                    cart: [],
                };
        default:
            return state;
    }
};

export default ProductReducer;