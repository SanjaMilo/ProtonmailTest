import React from 'react';
import styles from '../styles/Home.module.css';
import { Row, Col } from 'react-bootstrap';

export default function Header(props) {
	return (
		<div className={styles.headerNav}>
			<Row>
				<Col>
					<h1>Plans & Prices</h1>
				</Col>
			</Row>
			<Row>
				<Col className={styles.textAlignEnd}>
					<select onChange={(e) => props.onPeriodChange(e)} className={styles.select} name="" id="">
						<option value="monthly">Monthly</option>
						<option value="annually">Annually</option>
						<option value="twoyears">2 Years</option>
					</select>
					<select onChange={(e) => props.onCurrencyChange(e)} className={styles.select} name="" id="">
						<option value="eur">EUR</option>
						<option value="chf">CHF</option>
						<option value="usd">USD</option>
					</select>
				</Col>
			</Row>
		</div>
	);
}
