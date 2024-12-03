import { delay, http, HttpResponse } from 'msw'
import { setupWorker } from 'msw/browser'
import data from "./data.json"

const worker = setupWorker(
    http.get(import.meta.env.VITE_API_URL + '/products', async () => {
        await delay(300)
        return HttpResponse.json(data)
    }),
    http.get(import.meta.env.VITE_API_URL + '/product', async ({ request }) => {
        await delay(300)
        const url = new URL(request.url)
        const productIds = url.searchParams.get("id").split(",")
        let filtredProduct = []

        productIds.map((id) => {
            filtredProduct.push(data.filter((products) => products.id == id)[0])
        })

        return HttpResponse.json(filtredProduct)
    }),
)

await worker.start({ onUnhandledRequest: 'bypass' })