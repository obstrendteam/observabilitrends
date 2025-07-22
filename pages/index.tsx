import Link from 'next/link';
import Layout from '@/components/Layout';

export default function Home() {
  const articles = [
    { slug: 'grafana', title: 'Mastering Grafana for Business-Centric Dashboards' },
    { slug: 'dynatrace', title: 'Deep Dive into Dynatrace Smartscape and Davis AI' },
    { slug: 'prometheus', title: 'Prometheus Metrics and Alerting Best Practices' },
    { slug: 'splunk', title: 'Making the Most of Splunk Dashboards and SPL' },
    { slug: 'datadog', title: 'Efficient Observability with Datadog Integrations' }
  ];

  return (
    <Layout>
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">ObservabiliTrends</h1>
        <p className="text-lg text-gray-600">Explore the latest in observability tools, trends, and resources</p>
      </section>
      <section className="grid md:grid-cols-2 gap-6">
        {articles.map(article => (
          <Link key={article.slug} href={\`/articles/\${article.slug}\`} className="border p-4 rounded hover:shadow-lg">
            <h2 className="text-xl font-semibold">{article.title}</h2>
            <p className="text-sm text-gray-500">Read more →</p>
          </Link>
        ))}
      </section>
    </Layout>
  );
}