import {useEffect, useState} from "react";
import {API_BASE_URL} from "../../api/config.js";
import {Link} from "react-router-dom";


export function AdminArticlesPage() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        if (articles && articles.length > 0)
            return

        async function fetchArticles() {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/articles`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            setArticles(await response.json());
        }

        fetchArticles();
    }, [])

    async function deleteArticle(id) {
        if (!window.confirm("Are you sure you want to delete article " + id + " ?")) {
            return
        }

        const token = localStorage.getItem('token');

        const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })

        if (response.ok) {
            window.location.reload();
        }
    }

    return (
        <div className="flex flex-col text-white p-5">
            <h1 className={"text-2xl"}>Articles</h1>
            <table>
                <thead className="border-1 border-white bg-[#346644]">
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Seller</th>
                        <th>Tags</th>
                        <th>Parrot</th>
                        <th>Likes</th>
                        <th>Notation</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {
                    articles.map((article, index) => (
                        <tr className="border-1 border-white">
                            <td>{article.id}</td>
                            <td>
                                <Link to={"/produit/" + article.id}>
                                    {article.title}
                                </Link>
                            </td>
                            <td>{article.price} €</td>
                            <td>{article.seller.name}</td>
                            <td>{article.tags}</td>
                            <td>{article.parrot ? 'Yes' : 'No'}</td>
                            <td>{article.likes}</td>
                            <td>{article.notation}/5</td>
                            <td>{article.category}</td>
                            <td>
                                <div className="flex flex-row">
                                    <button className={"p-1 bg-white text-black rounded-md cursor-pointer"} onClick={() => deleteArticle(article.id)}>DEL</button>
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