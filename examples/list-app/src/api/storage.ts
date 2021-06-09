import { List } from "../models/List";
import { DynamoDB } from "aws-sdk";

const PartitionKey = process.env.PARTITION_KEY as string;
const TableName = process.env.TABLE_NAME as string;

const StorageClient = new DynamoDB.DocumentClient();

export async function getAllLists(): Promise<List[]> {
  const result = await StorageClient.scan({
    TableName,
  }).promise();

  return result.Items as List[];
}

export async function getList(id: string): Promise<List> {
  const result = await StorageClient.get({
    Key: { [PartitionKey]: id },
    TableName,
  }).promise();

  return result.Item as List;
}

export async function saveList(list: List): Promise<List> {
  await StorageClient.put({
    TableName,
    Item: list,
  }).promise();

  return list;
}

export async function deleteList(id: string): Promise<void> {
  await StorageClient.delete({
    TableName,
    Key: { [PartitionKey]: id },
  }).promise();
}
