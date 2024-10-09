import React from 'react';
import { Row, Col, Card, Typography, Button } from 'antd';
import { Line } from 'react-chartjs-2';
import AdminDashboard from './Sidebar';

const { Title, Text } = Typography;

const Analytics = () => {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Sales',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        animation: {
            duration: 2000,
        },
    };

    return (
        <div style={{ padding: '20px' }}>
            <AdminDashboard />
            <Title level={2} style={{ textAlign: 'center', color: '#1890ff' }}>
                Analytics Dashboard
            </Title>
            <Row gutter={16} style={{ marginBottom: '20px' }}>
                <Col span={8}>
                    <Card hoverable>
                        <Text>Total Sales</Text>
                        <Title level={3}>$10,000</Title>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card hoverable>
                        <Text>New Users</Text>
                        <Title level={3}>1,500</Title>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card hoverable>
                        <Text>Active Sessions</Text>
                        <Title level={3}>3,200</Title>
                    </Card>
                </Col>
            </Row>
            <div style={{ marginBottom: '20px' }}>
                <Line data={data} options={options} />
            </div>
            <Row gutter={16}>
                <Col span={8}>
                    <Button type="primary" style={{ width: '100%' }}>
                        Refresh Data
                    </Button>
                </Col>
                <Col span={8}>
                    <Button type="primary" style={{ width: '100%' }}>
                        Export Data
                    </Button>
                </Col>
                <Col span={8}>
                    <Button type="primary" style={{ width: '100%' }}>
                        View Details
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

export default Analytics;
