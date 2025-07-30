import { useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { UserContext } from "../context/UserContext";
import { Button, Card, Accordion } from "react-bootstrap";

function PortfolioPage() {
  const { firmId } = useContext(UserContext);
  const [portfolios, setPortfolios] = useState([]);
  const [accountsByPortfolio, setAccountsByPortfolio] = useState({});

  useEffect(() => {
    if (!firmId) return;

    const fetchPortfolios = async () => {
      const { data: portfolios, error } = await supabase
        .from("portfolios")
        .select("*")
        .eq("firm_id", firmId);

      if (error) {
        console.error("❌ Error fetching portfolios:", error.message);
        return;
      }

      setPortfolios(portfolios);

      // Fetch accounts linked to each portfolio
      const accountMap = {};
      for (const portfolio of portfolios) {
        const { data: accounts, error: accErr } = await supabase
          .from("accounts")
          .select("*")
          .eq("portfolio_id", portfolio.id);

        if (!accErr && accounts) {
          accountMap[portfolio.id] = accounts;
        }
      }

      setAccountsByPortfolio(accountMap);
    };

    fetchPortfolios();
  }, [firmId]);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="text-primary">Portfolio Management</h2>
        <Button variant="primary">+ Add Portfolio</Button>
      </div>

      {portfolios.map((portfolio) => (
        <Card className="mt-3" key={portfolio.id}>
          <Card.Body>
            <Card.Title>{portfolio.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Strategy: {portfolio.strategy} | Currency: {portfolio.base_currency} | Inception: {portfolio.inception_date}
            </Card.Subtitle>

            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Linked Accounts</Accordion.Header>
                <Accordion.Body>
                  {accountsByPortfolio[portfolio.id]?.length > 0 ? (
                    accountsByPortfolio[portfolio.id].map((acc) => (
                      <div key={acc.id}>
                        <strong>{acc.name}</strong> - {acc.type} ({acc.currency})
                      </div>
                    ))
                  ) : (
                    <div>No linked accounts.</div>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default PortfolioPage;
