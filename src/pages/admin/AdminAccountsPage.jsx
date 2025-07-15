import {useEffect, useState} from "react";
import {API_BASE_URL} from "../../api/config.js";
import {Link} from "react-router-dom";

export function AdminAccountsPage() {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        if (accounts && accounts.length > 0)
            return

        async function fetchArticles() {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/accounts`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            setAccounts(await response.json());
        }

        fetchArticles();
    }, [])

    async function deleteAccount(id) {
        if (!window.confirm("Are you sure you want to delete account " + id + " ?")) {
            return
        }

        const token = localStorage.getItem('token');

        const response = await fetch(`${API_BASE_URL}/accounts/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })

        if (response.ok) {
            window.location.reload();
        } else {
            alert(`Erreur serveur ${response.status}`);
        }
    }

    return (
        <div className="flex flex-col text-white p-5">
            <h1 className={"text-2xl"}>Accounts</h1>
            <table>
                <thead className="border-1 border-white bg-[#346644]">
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Is Seller</th>
                        <th>Is Admin</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {
                    accounts.map((account, index) => (
                        <tr className="border-1 border-white">
                            <td>{account.id}</td>
                            <td>
                                <Link to={"/produit/" + account.id}>
                                    {account.username}
                                </Link>
                            </td>
                            <td>{(account.isSeller ? "Yes" : "No")}</td>
                            <td>{(account.admin ? "Yes" : "No")}</td>
                            <td>
                                <div className="flex flex-row">
                                    <button className={"p-1 bg-white text-black rounded-md cursor-pointer"} onClick={() => deleteAccount(account.id)}>DEL</button>
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