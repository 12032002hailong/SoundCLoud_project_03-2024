import React, { cache } from "react";
import { useSearchParams } from "next/navigation";
import WaveTrack from "@/components/track/wave.track";
import { Container } from "@mui/material";
import { sendRequest } from "@/utils/api";
import { Metadata, ResolvingMetadata } from 'next'
import slugify from "slugify";
import NotFound from "./not-found";


type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const temp = params?.slug?.split('.html') ?? [];
  const temp1 = temp[0]?.split('-') ?? [];
  const id = temp1[temp1.length - 1];
  // fetch data
  const res = await sendRequest<IBackendRes<ITrackTop>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/${id}`,
    method: "GET",
    nextOption: { cache: "no-store" },
  });

  return {
    title: res.data?.title,
    description: res.data?.description,
    openGraph: {
      title: 'Hai long',
      description: 'Beyond Your Coding Skills',
      type: 'website',
      images: [`https://www.freepik.com/free-vector/rectangle-frame-abstract-background-vector_16176159.htm#query=background&position=15&from_view=keyword&track=sph&uuid=bfd0f921-9187-4092-a8c4-2738bc0b8385`],
    }
  }
}


const DetailTrackPage = async (props: any) => {
  await new Promise(resolve => setTimeout(resolve, 1500))

  const { params } = props;
  const temp = params?.slug?.split('.html') ?? [];
  const temp1 = temp[0]?.split('-') ?? [];
  const id = temp1[temp1.length - 1];
  const res = await sendRequest<IBackendRes<ITrackTop>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/${id}`,
    method: "GET",
    nextOption: { cache: "no-store" },
  });

  const res1 = await sendRequest<IBackendRes<IModelPaginate<ITrackComment>>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/comments`,
    method: "POST",
    queryParams: {
      current: 1,
      pageSize: 10,
      trackId: id,
      sort: "-createdAt",
    },
  });

  if (!res)
    NotFound()


  return (
    <Container>
      <WaveTrack
        track={res?.data ?? null}
        //@ts-ignore
        comments={res1?.data?.result ?? []}
      />
    </Container>
  );
};

export default DetailTrackPage;
