import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { supabase } from '../lib/supabaseClient';

const AddPortfolioModal = ({ show, onHide, onPortfolioAdded }) => {
  const [name, setName] = useState('');
  const [strategy, setStrategy] = useState('');
  const [baseCurrency, setBaseCurrency] = useState('USD');

const handleSubmit = async () => {
  // Step 1: Get current user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    alert('User not authenticated');
    return;
  }

  // Step 2: Look up firm_id from users table
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('firm_id')
    .eq('id', user.id)
    .single();

  if (userError || !userData?.firm_id) {
    alert('Unable to determine firm ID: ' + (userError?.message || 'Unknown error'));
    return;
  }

  // Step 3: Insert portfolio with firm_id
  const { error } = await supabase.from('portfolios').insert([
    {
      name,
      strategy,
      base_currency: baseCurrency,
      firm_id: userData.firm_id,
    },
  ]);

  if (error) {
    alert('Failed to add portfolio: ' + error.message);
  } else {
    onPortfolioAdded(); // Refresh portfolios
    onHide(); // Close modal
    setName('');
    setStrategy('');
    setBaseCurrency('USD');
  }
};


  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Portfolio</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Portfolio Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. Fosco Global Macro"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Strategy</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. L/S Equity, Global Macro"
              value={strategy}
              onChange={(e) => setStrategy(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Base Currency</Form.Label>
            <Form.Select
              value={baseCurrency}
              onChange={(e) => setBaseCurrency(e.target.value)}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Add Portfolio
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddPortfolioModal;
