import React, { useEffect, useState } from 'react'
import Axios from 'axios'

function HistoryPage() {

    const [History, setHistory] = useState([])

    useEffect(() => {

        Axios.get('/api/users/getHistory')
            .then(response => {
                if (response.data.success) {
                    setHistory(response.data.history)
                } else {
                    alert('Failed to get History')
                }
            })

    }, [])

    return (
        <div style={{ width: '80%', margin: '3rem auto ' }}>
            <div style={{ textAlign: 'center' }}>
                <h1>History</h1>
            </div>
            <br />
            <table>
                <thead>
                    <tr>
                        <th>Payment Id</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Date of Purchase</th>

                    </tr>
                </thead>

                <tbody>
                    {History.map(item => (
                        <tr key={item._id}>
                            <td>{item.paymentId}</td>
                            <td>{item.price}</td>
                            <td>{item.quantity}</td>
                            <td>{item.dateOfPurchase}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default HistoryPage
