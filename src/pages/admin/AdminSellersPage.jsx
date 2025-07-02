import {useEffect, useState} from "react";
import {API_BASE_URL} from "../../api/config.js";
import {Link} from "react-router-dom";

export function AdminSellersPage() {
    const [sellers, setSellers] = useState([]);

    useEffect(() => {
        async function fetchSellers() {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/sellers`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            setSellers(await response.json());
        }

        fetchSellers();
    })

    return (
        <div className="flex flex-col text-white p-5">
            <h1 className={"text-2xl"}>Sellers</h1>
            <table>
                <thead className="border-1 border-white bg-[#346644]">
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {
                    sellers.map((seller, index) => (
                        <tr className="border-1 border-white">
                            <td>{seller.id}</td>
                            <td>
                                <Link to={"/produit/" + seller.id}>
                                    {seller.name}
                                </Link>
                            </td>
                            <td>{seller.description}</td>
                            <td>
                                <div className="flex flex-row">
                                    <button className={"p-1 bg-white text-black rounded-md cursor-pointer"} onClick={() => {}}>??</button>
                                </div>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}