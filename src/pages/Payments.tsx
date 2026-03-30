import { Card } from '../components/ui/Card';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from '../components/ui/Table';
import { Badge, getStatusVariant } from '../components/ui/Badge';
import { dataService } from '../services/dataService';
import { formatCurrency, formatDate } from '../utils/formatters';
import { CreditCard, CheckCircle, Clock, XCircle } from 'lucide-react';

export function Payments() {
  const payments = dataService.getAllPayments();
  const projects = dataService.getAllProjects();

  const getProjectName = (paymentId: string): string => {
    const project = projects.find((p) => p.payments.some((pay) => pay.paymentId === paymentId));
    return project ? project.name : 'Unknown Project';
  };

  const approvedPayments = payments.filter((p) => p.approvalFlow.status === 'Approved');
  const pendingPayments = payments.filter((p) => p.approvalFlow.status === 'Pending');
  const rejectedPayments = payments.filter((p) => p.approvalFlow.status === 'Rejected');

  const totalApprovedAmount = approvedPayments.reduce((sum, p) => sum + p.amount, 0);
  const totalPendingAmount = pendingPayments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Payments & Approvals</h1>
        <p className="text-gray-600">Track payment requests and approval status</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-2">
            <CreditCard className="h-6 w-6 text-blue-600" />
            <h3 className="font-semibold text-gray-700">Total Payments</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{payments.length}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-2">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <h3 className="font-semibold text-gray-700">Approved</h3>
          </div>
          <p className="text-3xl font-bold text-green-600">{approvedPayments.length}</p>
          <p className="text-sm text-gray-600 mt-1">{formatCurrency(totalApprovedAmount)}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-2">
            <Clock className="h-6 w-6 text-yellow-600" />
            <h3 className="font-semibold text-gray-700">Pending</h3>
          </div>
          <p className="text-3xl font-bold text-yellow-600">{pendingPayments.length}</p>
          <p className="text-sm text-gray-600 mt-1">{formatCurrency(totalPendingAmount)}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-2">
            <XCircle className="h-6 w-6 text-red-600" />
            <h3 className="font-semibold text-gray-700">Rejected</h3>
          </div>
          <p className="text-3xl font-bold text-red-600">{rejectedPayments.length}</p>
        </Card>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Payment Requests</h2>
        </div>
        <Table>
          <TableHeader>
            <TableHead>Payment ID</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Requested By</TableHead>
            <TableHead>Request Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Approved By</TableHead>
          </TableHeader>
          <TableBody>
            {payments.length > 0 ? (
              payments.map((payment) => (
                <TableRow key={payment.paymentId}>
                  <TableCell>
                    <span className="font-medium text-gray-900">{payment.paymentId}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-900">{getProjectName(payment.paymentId)}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(payment.amount)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-900">{payment.requestedBy}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-900">{formatDate(payment.requestDate)}</span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      text={payment.approvalFlow.status}
                      variant={getStatusVariant(payment.approvalFlow.status)}
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm text-gray-900">{payment.approvalFlow.approvedBy}</p>
                      {payment.approvalFlow.approvedDate && (
                        <p className="text-xs text-gray-500">
                          {formatDate(payment.approvalFlow.approvedDate)}
                        </p>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className="text-center py-12 text-gray-500" colSpan={7}>
                  No payment records available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {payments.some((p) => p.invoices.length > 0) && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Invoice Details</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {payments
              .filter((p) => p.invoices.length > 0)
              .map((payment) => (
                <Card key={payment.paymentId} className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{payment.paymentId}</h3>
                      <p className="text-sm text-gray-600">{getProjectName(payment.paymentId)}</p>
                    </div>
                    <Badge
                      text={payment.approvalFlow.status}
                      variant={getStatusVariant(payment.approvalFlow.status)}
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="border-t border-gray-200 pt-3">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Invoices:</p>
                      {payment.invoices.map((invoice) => (
                        <div
                          key={invoice.invoiceId}
                          className="flex justify-between items-center p-3 bg-gray-50 rounded-lg mb-2"
                        >
                          <div>
                            <p className="font-medium text-gray-900">{invoice.invoiceId}</p>
                            <p className="text-sm text-gray-600">{invoice.vendor}</p>
                          </div>
                          <span className="font-semibold text-gray-900">
                            {formatCurrency(invoice.amount)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                      <span className="font-semibold text-gray-700">Total Amount:</span>
                      <span className="text-lg font-bold text-gray-900">
                        {formatCurrency(payment.amount)}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
