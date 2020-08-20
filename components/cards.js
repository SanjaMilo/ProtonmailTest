import React from 'react';
import styles from '../styles/Home.module.css';
import { Col, Card, Button } from 'react-bootstrap';

export default function Cards(props) {
	return (
		<Col className={styles.colCards} lg={3} md={6} sm={6} xs={12}>
			<Card className={styles.cards}>
				<Card.Body className={styles.body}>
					<Card.Title as="h5">{props.name}</Card.Title>
					<p className={styles.textP}>
						<span>{props.currency} </span>
						<span className={styles.bigNumber}>{props.monthly}</span> / mo
					</p>
					<p className={styles.textP}>
						Billed as <span>{props.currency} </span> <span className={styles.price}> {props.pricing} </span>{' '}
						<span>{props.time}</span>
					</p>
					<Card.Title className={styles.title} as="h6">
						{props.title}
					</Card.Title>

					<Card.Text className={styles.parag}>
						<span className={styles.iconArrow}>
							<i className="fas fa-arrow-right" />
						</span>
						{props.user} user &#x2A;
					</Card.Text>
					<Card.Text className={styles.parag}>
						<span className={styles.iconArrow}>
							<i className="fas fa-arrow-right" />
						</span>
						{props.storage}
					</Card.Text>
					<Card.Text className={styles.parag}>
						<span className={styles.iconArrow}>
							<i className="fas fa-arrow-right" />
						</span>
						{props.addresses} addresses
					</Card.Text>
					<Card.Text className={styles.parag}>
						<span className={styles.iconArrow}>
							<i className="fas fa-arrow-right" />
						</span>
						Supports {props.domains} domains
					</Card.Text>

					{props.children}

					<Card.Text className={styles.parag}>
						<span className={styles.iconArrow}>
							<i className="fas fa-arrow-right" />
						</span>
						{props.vpn} &#x2A;
					</Card.Text>
					<Button className={styles.selectBtn}>Select</Button>
				</Card.Body>
			</Card>
		</Col>
	);
}
