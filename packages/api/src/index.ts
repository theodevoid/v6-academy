import { useQuery } from '@tanstack/react-query';
import { Prisma } from '@v6-academy/db';
import axios, { AxiosInstance, AxiosPromise } from 'axios';

import { ExtractFnReturnType, QueryConfig } from '~/lib/react-query';

const getCourse = (axiosInstance: AxiosInstance) => {
  const courseDetails = Prisma.validator<Prisma.CourseDefaultArgs>()({
    include: {
      author: true,
      category: true,
      units: {
        include: {
          topics: true,
        },
      },
    },
  });

  type CourseDetails = Prisma.CourseGetPayload<typeof courseDetails>;

  const getCourseById = (id: number): AxiosPromise<CourseDetails> => {
    return axiosInstance.get(`/courses/${id}`);
  };

  type QueryFnType = typeof getCourseById;

  type UseGetCourseQueryOptions = {
    courseId: number;
    config?: QueryConfig<QueryFnType>;
  };

  return ({ courseId, config }: UseGetCourseQueryOptions) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
      ...config,
      queryKey: ['course', courseId],
      queryFn: () => getCourseById(courseId),
    });
  };
};

const course = {
  getCourse,
};

export class ApiClient {
  private axiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:2000',
  });

  public routes = {
    course,
  };

  constructor({
    customAxiosInstance,
  }: {
    customAxiosInstance?: AxiosInstance;
  }) {
    if (customAxiosInstance) {
      this.axiosInstance = customAxiosInstance;
    }
  }

  public init() {
    const initializedRoutes = {};

    for (const routeName in this.routes) {
      for (const handler in this.routes[routeName]) {
        initializedRoutes[routeName][handler] = this.routes[routeName][handler](
          this.axiosInstance,
        );
      }
    }

    return initializedRoutes;
    
    // return {
    //   course: {
    //     getCourse: this.routes.course.getCourse(this.axiosInstance),
    //   },
    // };
  }
}

const apiClient = new ApiClient({});

const api = apiClient.init();

api.