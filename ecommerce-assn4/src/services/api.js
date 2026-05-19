const BASE_URL = 'http://localhost:3000'; // update this to match api endpoint

// fetches products
// also accepts the ability to search, filter, and sort products when fetching
export async function getProducts({ search = '', category = '', sort = '' } = {}) {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (category && category !== 'all') params.append('category', category);
    if (sort) params.append('sort', sort);

    const response = await fetch(`${BASE_URL}/products?${params.toString()}`);
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }

    return response.json();
}

// fetches a single product via an ID
export async function getProductById(id) {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch product');
    }

    return response.json();
}

// fetches all categories
export async function getCategories() {
    const response = await fetch(`${BASE_URL}/products/categories`);
    if (!response.ok) {
        throw new Error('Failed to fetch categories');
    }

    return response.json();
}

// create a new order
export async function createOrder({ customer, items, total }) {
    const response = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer, items, total }),
    });

    if (!response.ok) {
        throw new Error('Failed to create order');
    }

    return response.json();
}