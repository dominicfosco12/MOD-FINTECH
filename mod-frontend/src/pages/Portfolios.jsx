// src/pages/Portfolios.jsx
import React, { useEffect, useState } from "react";
import { Table, Button, Container, Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import { supabase } from "../lib/supabaseClient";
import { PencilSquare, Trash3, Plus, Eye } from "react-bootstrap-icons";
import AddPortfolioModal from "../components/AddPortfolioModal";

const Portfolios = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchPortfolios = async () => {
    const { data, error } = await supabase
      .from("portfolios")
      .select("*, accounts (*)")
      .order("created_at", { ascending: false });

    if (!error) setPortfolios(data);
    else console.error("Error fetching portfolios:", error.message);
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-electric-blue">Portfolio Management</h2>
        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          + Add Portfolio
        </Button>
      </div>

      <Table hover bordered responsive className="shadow-sm rounded">
        <thead className="table-dark">
          <tr>
            <th>Portfolio Name</th>
            <th>Strategy</th>
            <th>Base Currency</th>
            <th>Accounts</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {portfolios.map((portfolio) => (
            <tr key={portfolio.id}>
              <td>{portfolio.name}</td>
              <td>{portfolio.strategy}</td>
              <td>{portfolio.base_currency}</td>
              <td>
                {portfolio.accounts?.length ? (
                  portfolio.accounts.map((acc) => (
                    <Badge key={acc.id} bg="secondary" className="me-1">
                      {acc.type} — {acc.name}
                    </Badge>
                  ))
                ) : (
                  <span className="text-muted">No accounts</span>
                )}
              </td>
              <td className="text-center">
                <OverlayTrigger placement="top" overlay={<Tooltip>Edit Portfolio</Tooltip>}>
                  <Button variant="outline-secondary" size="sm" className="me-1">
                    <PencilSquare />
                  </Button>
                </OverlayTrigger>

                <OverlayTrigger placement="top" overlay={<Tooltip>Delete Portfolio</Tooltip>}>
                  <Button variant="outline-danger" size="sm" className="me-1">
                    <Trash3 />
                  </Button>
                </OverlayTrigger>

                <OverlayTrigger placement="top" overlay={<Tooltip>Add Account</Tooltip>}>
                  <Button variant="outline-primary" size="sm" className="me-1">
                    <Plus />
                  </Button>
                </OverlayTrigger>

                <OverlayTrigger placement="top" overlay={<Tooltip>View Portfolio</Tooltip>}>
                  <Button variant="outline-dark" size="sm">
                    <Eye />
                  </Button>
                </OverlayTrigger>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <AddPortfolioModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onPortfolioAdded={fetchPortfolios}
      />
    </Container>
  );
};

export default Portfolios;
